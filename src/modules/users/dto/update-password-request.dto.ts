import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty
} from 'class-validator';

export class UpdateUserPasswordRequestDto {
  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
