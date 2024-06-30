import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateHistoryCommand } from '../impl/create-history.command';
import { HistoryRepository } from '../../entities/history.repository';
import { History } from '../../entities/history.entity';
import { AppLoggerService } from 'src/modules/logger/logger.service';
import { UserRepository } from 'src/modules/users/entities/user.repository';

@CommandHandler(CreateHistoryCommand)
export class CreateHistoryHandler
  implements ICommandHandler<CreateHistoryCommand>
{
  constructor(
    private readonly historyRepo: HistoryRepository,
    private readonly logger: AppLoggerService,
    private readonly userRepo: UserRepository,
  ) {
    this.logger.setContext(CreateHistoryHandler.name);
  }

  async execute(command: CreateHistoryCommand): Promise<void> {
    this.logger.log('Executing CreateHistoryCommand');

    const { oldValue, newValue, userId, eventType } = command;
    this.logger.log(
      `Received data: oldValue=${oldValue}, newValue=${newValue}, userId=${userId}, eventType=${eventType}`,
    );

    const payload = new History();
    payload.oldValue = oldValue;
    payload.newValue = newValue;
    payload.eventType = eventType;
    payload.user = await this.userRepo.findOne({ where: { id: userId } });

    const history = await this.historyRepo.save(payload);
    this.logger.log(
      `History record created successfully with ID: ${history.id}`,
    );
  }
}
