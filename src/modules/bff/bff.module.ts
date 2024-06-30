import { Module } from '@nestjs/common';
import { BffService } from './bff.service';
import { BffController } from './bff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from '../history/entities/history.entity';
import { HistoryRepository } from '../history/entities/history.repository';
import { BffQueriesHandlers } from './queries';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerModule } from '../logger/logger.module';
import { ErrorModule } from '../error/error.module';
import { JwtService } from 'src/service/jwt-service/jwt-service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([History]),
    CqrsModule,
    LoggerModule,
    ErrorModule,
  ],
  controllers: [BffController],
  providers: [BffService, HistoryRepository, JwtService, ...BffQueriesHandlers],
})
export class BffModule {}
