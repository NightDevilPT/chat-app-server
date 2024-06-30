import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { UserRepository } from '../../entities/user.repository';
import { AppErrorService } from 'src/modules/error/error.service';
import { PasswordService } from 'src/service/password/password.service';
import { MailService } from 'src/service/mail-service/mail-service.service';
import { ConfigService } from '@nestjs/config';
import {
  MailSubjects,
  MailTemplateEnum,
  getMailTemplate,
} from 'src/templates/mail-templates';
import { User } from '../../entities/user.entity';
import { BaseResponse, EventTypesEnum } from 'src/interface';
import { AppLoggerService } from 'src/modules/logger/logger.service';
import { CreateHistoryCommand } from 'src/modules/history/command/impl/create-history.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private userRepo: UserRepository,
    private errorService: AppErrorService,
    private hashService: PasswordService,
    private mailService: MailService,
    private configService: ConfigService,
    private logger: AppLoggerService,
    private commandBus: CommandBus
  ) {
    this.logger.setContext(CreateUserHandler.name);
  }

  async execute({ payload }: CreateUserCommand): Promise<BaseResponse> {
    this.logger.log('Executing CreateUserCommand');

    const findUser = await this.userRepo.findOne({
      where: { email: payload.email },
    });
    if (findUser) {
      this.logger.warn(
        `User already registered with this email: ${payload.email}`,
      );
      throw this.errorService.throwNotFoundError(
        `User already registered with this ${payload.email} email`,
      );
    }

    const token = await this.hashService.hashPassword(
      `${new Date().getTime()}`,
    );
    const password = await this.hashService.hashPassword(payload.password);

    const userPayload = new User();
    userPayload.userName = payload.userName;
    userPayload.password = password;
    userPayload.token = token;
    userPayload.email = payload.email;

    const createUser = await this.userRepo.save(userPayload);
    this.logger.log(`User registered successfully: ${payload.email}`);

    const verifyLink = `${this.configService.get('ORIGIN')}/auth/verify?token=${token}`;
    const emailContent = this.mailService.getMailTemplate(
      MailTemplateEnum.VERIFYEMAIL,
      {
        name: payload.userName,
        verifyLink: verifyLink,
      },
    );

    await this.mailService.sendMail(
      payload.email,
      MailSubjects[MailTemplateEnum.VERIFYEMAIL],
      emailContent,
    );

    this.logger.log(`Verification email sent to: ${payload.email} ${userPayload.id}`);
    this.commandBus.execute(new CreateHistoryCommand(EventTypesEnum.UserCreatedEvent,createUser.id,null,null))

    return {
      message: `Verification link sent to your email ${payload.email}`,
    };
  }
}
