import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserPasswordDto {
  @ApiProperty({ description: 'The new password of the user' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
