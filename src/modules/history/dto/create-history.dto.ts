import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsUUID,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { EventTypesEnum } from 'src/interface';

export class CreateHistoryDto {
  @ApiProperty({
    description: 'The type of event that occurred',
    example: 'CreateUserCommand',
    enum: EventTypesEnum,
  })
  @IsEnum(EventTypesEnum)
  @IsNotEmpty()
  eventType: EventTypesEnum;

  @ApiProperty({
    description: 'The previous values of the entity fields',
    type: 'json',
    nullable: true,
    required: false,
  })
  @IsObject()
  @IsOptional()
  oldValue: Record<string, any>;

  @ApiProperty({
    description: 'The new values of the entity fields',
    type: 'json',
    nullable: true,
    required: false,
  })
  @IsObject()
  @IsOptional()
  newValue: Record<string, any>;

  @ApiProperty({
    description: 'The user who performed the action',
    type: () => String,
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
