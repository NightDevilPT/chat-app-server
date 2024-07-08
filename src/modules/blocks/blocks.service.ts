import { Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateBlockCommand } from './commands/impl/create-block.command';

@Injectable()
export class BlocksService {
  constructor(private commandBus: CommandBus) {}

  create(payload: CreateBlockDto, userId: string) {
    return this.commandBus.execute(new CreateBlockCommand(payload, userId));
  }
}
