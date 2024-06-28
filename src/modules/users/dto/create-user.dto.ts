import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user' })
  @IsString()
//   @IsNotEmpty()
  userName: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
//   @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
//   @IsNotEmpty()
  password: string;
}
