import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBlockCommand } from '../impl/create-block.command';
import { AppLoggerService } from 'src/modules/logger/logger.service';
import { AppErrorService } from 'src/modules/error/error.service';
import { Block, BlockEnum } from '../../entities/block.entity';
import { EventTypesEnum } from 'src/interface';
import { CreateHistoryCommand } from 'src/modules/history/command/impl/create-history.command';
import { UserRepository } from 'src/modules/users/entities/user.repository';
import { BlockRepository } from '../../entities/block.repository';

@CommandHandler(CreateBlockCommand)
export class CreateBlockHandler implements ICommandHandler<CreateBlockCommand> {
  constructor(
    private readonly blockRepo: BlockRepository,
    private readonly userRepo: UserRepository,
    private readonly logger: AppLoggerService,
    private readonly errorService: AppErrorService,
    private readonly commandBus: CommandBus,
  ) {
    this.logger.setContext(CreateBlockHandler.name);
  }

  async execute({ payload, userId }: CreateBlockCommand): Promise<any> {
    this.logger.log(`Processing CreateBlockCommand for UserId: ${userId}`);

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      this.logger.error(`User not found: UserId ${userId}`, '');
      throw this.errorService.throwNotFoundError('User not found');
    }

    const blockedUser = await this.userRepo.findOne({
      where: { id: payload.blockedToId },
    });
    if (!blockedUser) {
      this.logger.error(
        `Blocked user not found: BlockedToId ${payload.blockedToId}`,
        '',
      );
      throw this.errorService.throwNotFoundError('Blocked user not found');
    }

    this.logger.log(
      `Creating block record for UserId: ${userId} blocking UserId: ${payload.blockedToId}`,
    );

    const existingBlock = await this.blockRepo.findOne({
      where: {
        blockedBy: { id: userId },
        blockedTo: { id: payload.blockedToId },
      },
    });

    const block = existingBlock || new Block();
    block.blockedBy = block.blockedBy || user;
    block.blockedTo = block.blockedTo || blockedUser;
    block.status = payload.status;

    try {
      const createdBlock = await this.blockRepo.save(block);
      this.logger.log(
        `Block record successfully created for UserId: ${userId}`,
      );

      const eventName =
        payload.status === BlockEnum.BLOCK
          ? EventTypesEnum.UserBlockEvent
          : EventTypesEnum.UserUnblockEvent;

      await this.commandBus.execute(
        new CreateHistoryCommand(eventName, user.id, null, {
          id: blockedUser.id,
          name: blockedUser.userName,
          email: blockedUser.email,
          status: payload.status,
        }),
      );

      return {
        data: createdBlock,
        message:
          payload.status === BlockEnum.BLOCK
            ? 'User successfully blocked'
            : 'User successfully unblocked',
      };
    } catch (error) {
      this.logger.error(
        `Failed to create block record for UserId: ${userId}`,
        error.stack,
      );
      throw error;
    }
  }
}
