import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { GenderEnum } from 'src/interface';

export class CreateProfileDto {
  @ApiProperty({ description: 'The first name of the user' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'The last name of the user' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'The gender of the user',
    enum: GenderEnum,
    type: 'enum',
  })
  @IsString()
  @IsNotEmpty()
  gender: GenderEnum;

  @ApiProperty({ description: 'The avatar of the user', required: false })
  @IsString()
  @IsOptional()
  avatar: string;
}
