// src/modules/blocks/entities/block.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/users/entities/user.entity';

export enum BlockEnum {
  BLOCK = 'BLOCK',
  UNBLOCK = 'UNBLOCK',
}

@Entity('blocks')
export class Block {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The unique identifier of the block record' })
  id: string;

  @ManyToOne(() => User, (user) => user.blockedUsers)
  @ApiProperty({ type: () => User, description: 'The user who is blocking' })
  blockedBy: User;

  @ManyToOne(() => User, (user) => user.blockedByUsers)
  @ApiProperty({ type: () => User, description: 'The user who is blocked' })
  blockedTo: User;

  @Column()
  @ApiProperty({
    description: 'The date when the block record was created',
    type: 'enum',
    enum: BlockEnum,
  })
  status: BlockEnum;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'The date when the block record was created' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    description: 'The date when the block record was last updated',
  })
  updatedAt: Date;
}
