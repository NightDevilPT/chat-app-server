import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ErrorModule } from '../error/error.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports:[ErrorModule,LoggerModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
