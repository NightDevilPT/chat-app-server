import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { BlockEnum } from '../entities/block.entity';

export class UpdateBlockDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The unique identifier of the user who is blocked',
  })
  blockedToId: string;

  @IsEnum(BlockEnum)
  @ApiProperty({ description: 'The status of the block', enum: BlockEnum })
  status: BlockEnum;
}
