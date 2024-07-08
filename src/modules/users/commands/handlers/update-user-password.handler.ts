import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserPasswordCommand } from '../impl/update-user-password.command';
import { AppErrorService } from 'src/modules/error/error.service';
import { AppLoggerService } from 'src/modules/logger/logger.service';
import { UserRepository } from '../../entities/user.repository';
import { PasswordService } from 'src/service/password/password.service';
import { BaseResponse, EventTypesEnum } from 'src/interface';
import { CreateHistoryCommand } from 'src/modules/history/command/impl/create-history.command';

@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordHandler
  implements ICommandHandler<UpdateUserPasswordCommand>
{
  constructor(
    private readonly userRepo: UserRepository,
    private readonly errorService: AppErrorService,
    private readonly logger: AppLoggerService,
    private readonly hashService: PasswordService,
    private readonly commandBus: CommandBus,
  ) {
    this.logger.setContext(UpdateUserPasswordHandler.name);
  }

  async execute({
    payload,
    token,
  }: UpdateUserPasswordCommand): Promise<BaseResponse> {
    this.logger.log(
      `Execution started with token: ${token} and payload: ${JSON.stringify(payload, null, 2)}`,
    );

    const user = await this.userRepo.findOne({
      where: { token },
      select: ['token', 'id', 'password'],
    });

    if (!user) {
      this.logger.error(
        `User not found with token: ${token}`,
        'Not Found Error',
      );
      throw this.errorService.throwNotFoundError(`User not found`);
    }

    user.token = null;
    user.password = await this.hashService.hashPassword(payload.password);

    await this.userRepo.save(user);

    this.logger.log(`Password successfully updated for user ID: ${user.id}`);
    this.commandBus.execute(
      new CreateHistoryCommand(
        EventTypesEnum.UserPasswordUpdatedEvent,
        user.id,
        null,
        null,
      ),
    );
    return {
      message: `Password successfully updated.`,
    };
  }
}
