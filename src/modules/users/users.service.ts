import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { VerifyUserCommand } from './commands/impl/verify-user.command';
import { UpdateUserPasswordRequestDto } from './dto/update-password-request.dto';
import { UpdateUserPasswordRequestCommand } from './commands/impl/update-user-password-request.command';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserPasswordCommand } from './commands/impl/update-user-password.command';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserCommand } from './commands/impl/login-user.command';

@Injectable()
export class UsersService {
  constructor(private commandBus: CommandBus) {}

  create(createUserDto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  login(loginDto: LoginUserDto) {
    return this.commandBus.execute(new LoginUserCommand(loginDto));
  }

  verify(token: string) {
    return this.commandBus.execute(new VerifyUserCommand(token));
  }

  updatePasswordRequest(payload: UpdateUserPasswordRequestDto) {
    return this.commandBus.execute(new UpdateUserPasswordRequestCommand(payload));
  }

  updatePassword(payload: UpdateUserPasswordDto,token:string) {
    return this.commandBus.execute(new UpdateUserPasswordCommand(payload,token))
  }
}
