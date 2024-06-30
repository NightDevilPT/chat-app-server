import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../entities/user.repository';
import { AppErrorService } from 'src/modules/error/error.service';
import { ConfigService } from '@nestjs/config';
import { EventTypesEnum, loginResponse } from 'src/interface';
import { AppLoggerService } from 'src/modules/logger/logger.service';
import { JwtService } from 'src/service/jwt-service/jwt-service.service';
import { LoginUserCommand } from '../impl/login-user.command';
import { PasswordService } from 'src/service/password/password.service';
import { CreateHistoryCommand } from 'src/modules/history/command/impl/create-history.command';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private userRepo: UserRepository,
    private errorService: AppErrorService,
    private configService: ConfigService,
    private hashService: PasswordService,
    private logger: AppLoggerService,
    private commandBus: CommandBus,
    private jwtService: JwtService,
  ) {
    this.logger.setContext(LoginUserHandler.name);
  }

  async execute({ payload }: LoginUserCommand): Promise<loginResponse> {
    this.logger.log('Executing LoginUserCommand');

    const findUser = await this.userRepo.findOne({
      where: { email: payload.email },
      select: ['password', 'id', 'email', 'isVerified'],
    });
    if (!findUser) {
      this.logger.warn(`User Not found with this ${payload.email} email`);
      throw this.errorService.throwForbiddenError(
        `User Not found with this ${payload.email} email`,
      );
    }

    if (!findUser.isVerified) {
      throw this.errorService.throwForbiddenError(`Email not verified`);
    }

    const verifyPassword = await this.hashService.verifyPassword(
      payload.password,
      findUser.password,
    );

    if (!verifyPassword) {
      throw this.errorService.throwForbiddenError(
        `Email or Password incorrect`,
      );
    }

    const jwt = await this.jwtService.generateToken({
      id: findUser.id,
      emai: findUser.email,
      tokenTime: new Date().getTime(),
    });

    this.commandBus.execute(
      new CreateHistoryCommand(
        EventTypesEnum.UserLoginedEvent,
        findUser.id,
        null,
        null,
      ),
    );

    return {
      jwt,
      message: `Verification link sent to your email ${payload.email}`,
    };
  }
}
