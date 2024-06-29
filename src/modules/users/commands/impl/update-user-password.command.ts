import { UpdateUserPasswordRequestDto } from '../../dto/update-password-request.dto';
import { UpdateUserPasswordDto } from '../../dto/update-user-password.dto';

export class UpdateUserPasswordCommand {
  constructor(
    public readonly payload: UpdateUserPasswordDto,
    public readonly token: string,
  ) {}
}
