import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyUserCommand } from '../impl/verify-user.command';
import { AppErrorService } from 'src/modules/error/error.service';
import { UserRepository } from '../../entities/user.repository';
import { AppLoggerService } from 'src/modules/logger/logger.service';
import { BaseResponse, EventTypesEnum } from 'src/interface';
import { CreateHistoryCommand } from 'src/modules/history/command/impl/create-history.command';

@CommandHandler(VerifyUserCommand)
export class VerifyUserHandler implements ICommandHandler<VerifyUserCommand> {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly errorService: AppErrorService,
    private readonly logger: AppLoggerService,
    private readonly commandBus: CommandBus,
  ) {
    this.logger.setContext(VerifyUserHandler.name);
  }

  async execute({ token }: VerifyUserCommand): Promise<BaseResponse> {
    this.logger.log(`Execution started with token: ${token}`);

    if (!token || token.trim() === '') {
      this.logger.error('Token is empty or invalid', 'Token validation failed');
      throw this.errorService.throwForbiddenError('Invalid token');
    }

    const user = await this.userRepo.findOne({
      where: { token },
      select: ['id', 'email', 'token', 'isVerified'],
    });

    if (!user) {
      this.logger.error(
        'User not found with the provided token',
        'Token validation failed',
      );
      throw this.errorService.throwForbiddenError('Invalid token');
    }

    user.token = null;
    user.isVerified = true;

    await this.userRepo.save(user);

    this.logger.log(
      `User with email ${user.email} has been successfully verified`,
    );
    this.commandBus.execute(
      new CreateHistoryCommand(
        EventTypesEnum.UserVerifiedEvent,
        user.id,
        null,
        null,
      ),
    );
    return {
      message: `User with email ${user.email} has been successfully verified.`,
    };
  }
}
