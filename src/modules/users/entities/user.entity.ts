import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from 'src/modules/profiles/entities/profile.entity';
import { Message } from 'src/modules/messages/entities/message.entity';
import { Group } from 'src/modules/groups/entities/group.entity';
import { GroupMember } from 'src/modules/group-members/entities/group-member.entity';
import { ReadReceipt } from 'src/modules/read-receipts/entities/read-receipt.entity';
import { Block } from 'src/modules/blocks/entities/block.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The unique identifier of the user' })
  id: string;

  @Column()
  @ApiProperty({ description: 'The username of the user' })
  userName: string;

  @Column()
  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @Column({ select: false })
  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @Column({ default: null, select: false, nullable: true })
  @ApiProperty({ description: 'The authentication token of the user' })
  token: string | null;

  @Column({ default: false, select: false })
  @ApiProperty({ description: 'Whether the user is verified', default: false })
  isVerified: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'The date when the user was created' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'The date when the user was last updated' })
  updatedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(() => Message, (message) => message.sender, { cascade: true })
  @ApiProperty({
    type: () => [Message],
    description: 'The messages sent by the user',
  })
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver, { cascade: true })
  @ApiProperty({
    type: () => [Message],
    description: 'The messages received by the user',
  })
  receivedMessages: Message[];

  @OneToMany(() => Group, (group) => group.createdByUser, { cascade: true })
  @ApiProperty({
    type: () => [Group],
    description: 'The groups created by the user',
  })
  createdGroups: Group[];

  @OneToMany(() => GroupMember, (groupMember) => groupMember.user, {
    cascade: true,
  })
  @ApiProperty({
    type: () => [GroupMember],
    description: 'The group memberships of the user',
  })
  groupMemberships: GroupMember[];

  @OneToMany(() => ReadReceipt, (readReceipt) => readReceipt.user, {
    cascade: true,
  })
  @ApiProperty({
    type: () => [ReadReceipt],
    description: 'The read receipts of the user',
  })
  readReceipts: ReadReceipt[];

  @OneToMany(() => Block, (block) => block.blockedBy, { cascade: true })
  @ApiProperty({
    type: () => [Block],
    description: 'The users blocked by this user',
  })
  blockedUsers: Block[];

  @OneToMany(() => Block, (block) => block.blockedTo, { cascade: true })
  @ApiProperty({
    type: () => [Block],
    description: 'The users who have blocked this user',
  })
  blockedByUsers: Block[];
}
