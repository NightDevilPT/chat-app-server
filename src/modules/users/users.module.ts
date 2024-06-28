import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ErrorModule } from '../error/error.module';
import { LoggerModule } from '../logger/logger.module';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './entities/user.repository';
import { UserCommandHandlers } from './commands';
import { PasswordService } from 'src/service/password/password.service';
import { JwtService } from 'src/service/jwt-service/jwt-service.service';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/service/mail-service/mail-service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ErrorModule,
    LoggerModule,
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    PasswordService,
    UserRepository,
    JwtService,
    ConfigService,
    MailService,
    ...UserCommandHandlers,
  ],
})
export class UsersModule {}
