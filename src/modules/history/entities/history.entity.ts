import { ApiProperty } from '@nestjs/swagger';
import { EventTypesEnum } from 'src/interface';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('history')
export class History {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The unique identifier of the history record' })
  id: string;

  @Column()
  @ApiProperty({ description: 'The type of event that occurred', example: 'update', type:'enum', enum:EventTypesEnum })
  eventType: EventTypesEnum;

  @Column({ type: 'jsonb', nullable: true })
  @ApiProperty({ description: 'The previous values of the entity fields', type: 'json', nullable: true })
  oldValue: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  @ApiProperty({ description: 'The new values of the entity fields', type: 'json', nullable: true })
  newValue: Record<string, any>;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'The date when the history record was created' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'The date when the history record was last updated' })
  updatedAt: Date;
  
  @ManyToOne(() => User, user => user.history)
  @JoinColumn({ name: 'userId' })
  @ApiProperty({ description: 'The user who performed the action' })
  user: User;
}
