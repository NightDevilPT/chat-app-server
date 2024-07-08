import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/users/entities/user.entity';
import { Message } from 'src/modules/messages/entities/message.entity';
import { GroupMember } from 'src/modules/group-members/entities/group-member.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The unique identifier of the group' })
  id: string;

  @Column()
  @ApiProperty({ description: 'The name of the group' })
  name: string;

  @Column()
  @ApiProperty({ description: 'The description of the group' })
  description: string;

  @Column()
  @ApiProperty({ description: 'The ID of the user who created the group' })
  createdBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'The date when the user was created' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'The date when the user was last updated' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.createdGroups)
  @ApiProperty({
    type: () => User,
    description: 'The user who created the group',
  })
  createdByUser: User;

  @OneToMany(() => GroupMember, (groupMember) => groupMember.group, {
    cascade: true,
  })
  @ApiProperty({
    type: () => [GroupMember],
    description: 'The members of the group',
  })
  members: GroupMember[];

  @OneToMany(() => Message, (message) => message.group, { cascade: true })
  @ApiProperty({
    type: () => [Message],
    description: 'The messages in the group',
  })
  messages: Message[];
}
