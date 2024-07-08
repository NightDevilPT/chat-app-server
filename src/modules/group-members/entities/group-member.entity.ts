import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Group } from 'src/modules/groups/entities/group.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('group_members')
export class GroupMember {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The unique identifier of the group member' })
  id: string;

  @Column()
  @ApiProperty({ description: 'The ID of the group' })
  groupId: string;

  @Column()
  @ApiProperty({ description: 'The ID of the user' })
  userId: string;

  @Column()
  @ApiProperty({ description: 'The status of the group membership' })
  status: string;

  @Column({ type: 'timestamp' })
  @ApiProperty({ description: 'The date when the user was invited' })
  invitedAt: Date;

  @Column({ type: 'timestamp' })
  @ApiProperty({ description: 'The date when the user joined the group' })
  joinedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'The date when the user was created' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'The date when the user was last updated' })
  updatedAt: Date;

  @Column()
  @ApiProperty({
    description: 'The ID of the user who created the group membership',
  })
  createdBy: string;

  @ManyToOne(() => Group, (group) => group.members)
  @ApiProperty({
    type: () => Group,
    description: 'The group this membership belongs to',
  })
  group: Group;

  @ManyToOne(() => User, (user) => user.groupMemberships)
  @ApiProperty({
    type: () => User,
    description: 'The user who is a member of the group',
  })
  user: User;
}
