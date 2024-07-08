import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { JwtService } from 'src/service/jwt-service/jwt-service.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ErrorModule } from '../error/error.module';
import { LoggerModule } from '../logger/logger.module';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Block } from './entities/block.entity';
import { BlockRepository } from './entities/block.repository';
import { BlockCommandHandlers } from './commands';
import { UserRepository } from '../users/entities/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Block]),
    ErrorModule,
    LoggerModule,
    CqrsModule,
  ],
  controllers: [BlocksController],
  providers: [
    BlocksService,
    JwtService,
    AuthGuard,
    BlockRepository,
    UserRepository,
    ...BlockCommandHandlers,
  ],
})
export class BlocksModule {}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkxYjAyOGNkLTRkNmMtNGJiZi1iMzBkLTViODFmZjM4MGNkNCIsImVtYWkiOiJuaWdodGRldmlscHRAZ21haWwuY29tIiwidG9rZW5UaW1lIjoxNzIwNDAyNDAxOTE0LCJpYXQiOjE3MjA0MDI0MDEsImV4cCI6MTcyMDQwNjAwMX0.HVQ6VgjCyArO5xuPbU7KJ08C910ufc_tnZkAiM6c24A
