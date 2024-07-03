import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { GenderEnum } from 'src/interface';

export class UpdateProfileDto {
  @ApiProperty({ description: 'The first name of the user', required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ description: 'The last name of the user', required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    description: 'The gender of the user',
    enum: GenderEnum,
    type: 'enum',
    required: false,
  })
  @IsString()
  @IsOptional()
  gender: GenderEnum;

  @ApiProperty({ description: 'The avatar of the user', required: false })
  @IsString()
  @IsOptional()
  avatar: string;
}
