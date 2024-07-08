import { CreateUserHandler } from './handlers/create-user.handler';
import { LoginUserHandler } from './handlers/login-user.handler';
import { UpdateUserPasswordRequestHandler } from './handlers/update-user-password-request.handler';
import { UpdateUserPasswordHandler } from './handlers/update-user-password.handler';
import { VerifyUserHandler } from './handlers/verify-user.handler';

export const UserCommandHandlers = [
  CreateUserHandler,
  VerifyUserHandler,
  UpdateUserPasswordRequestHandler,
  UpdateUserPasswordHandler,
  LoginUserHandler,
];
