import { UpdateUserPasswordRequestDto } from "../../dto/update-password-request.dto";

export class UpdateUserPasswordRequestCommand {
	constructor(public readonly payload:UpdateUserPasswordRequestDto) {}
  }
  