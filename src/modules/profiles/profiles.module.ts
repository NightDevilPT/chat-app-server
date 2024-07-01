import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerModule } from '../logger/logger.module';
import { ErrorModule } from '../error/error.module';
import { ProfileHandlers } from './commands';
import { UserRepository } from '../users/entities/user.repository';
import { ProfileRepository } from './entities/profile.repository';
import { JwtService } from 'src/service/jwt-service/jwt-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    CqrsModule,
    LoggerModule,
    ErrorModule,
  ],
  controllers: [ProfilesController],
  providers: [
    ProfilesService,
    ProfileRepository,
    UserRepository,
    JwtService,
    ...ProfileHandlers,
  ],
})
export class ProfilesModule {}
