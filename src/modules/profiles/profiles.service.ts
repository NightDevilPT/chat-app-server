import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProfileCommand } from './commands/impl/create-profile.command';

@Injectable()
export class ProfilesService {
  constructor(private readonly commandBus: CommandBus) {}
  create(payload: CreateProfileDto, userId: string) {
    return this.commandBus.execute(new CreateProfileCommand(payload,userId));
  }
}
