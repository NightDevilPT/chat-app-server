import { CreateProfileDto } from '../../dto/create-profile.dto';

export class CreateProfileCommand {
  constructor(
    public readonly payload: CreateProfileDto,
    public readonly userId: string,
  ) {}
}
