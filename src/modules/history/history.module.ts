import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { History } from './entities/history.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from '../users/entities/user.repository';
import { HistoryHandlers } from './command';
import { AppLoggerService } from '../logger/logger.service';
import { LoggerModule } from '../logger/logger.module';
import { ErrorModule } from '../error/error.module';
import { HistoryRepository } from './entities/history.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, History]),
    CqrsModule,
    LoggerModule,
    ErrorModule,
  ],
  controllers: [HistoryController],
  providers: [
    HistoryService,
    UserRepository,
    HistoryRepository,
    ...HistoryHandlers,
  ],
})
export class HistoryModule {}
