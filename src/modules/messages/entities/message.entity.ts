import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/users/entities/user.entity';
import { Group } from 'src/modules/groups/entities/group.entity';
import { File } from 'src/modules/files/entities/file.entity';
import { ReadReceipt } from 'src/modules/read-receipts/entities/read-receipt.entity';

export enum MessageTypeEnum {
	TEXT="TEXT",
	FILE="FILE"
}

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'The unique identifier of the message' })
    id: string;

    @Column()
    @ApiProperty({ description: 'The ID of the sender' })
    senderId: string;

    @Column()
    @ApiProperty({ description: 'The ID of the receiver' })
    receiverId: string;

    @Column()
    @ApiProperty({ description: 'The ID of the group, if the message is in a group' })
    groupId: string;

    @Column()
    @ApiProperty({ description: 'The content of the message' })
    content: string;

    @Column({enum:MessageTypeEnum})
    @ApiProperty({ description: 'The type of the message', enum:MessageTypeEnum})
    messageType: MessageTypeEnum;

    @Column({ type: 'timestamp' })
    @ApiProperty({ description: 'The date when the message was created' })
    createdAt: Date;

    @Column({ type: 'timestamp' })
    @ApiProperty({ description: 'The date when the message was last updated' })
    updatedAt: Date;

    @Column()
    @ApiProperty({ description: 'The ID of the user who created the message' })
    createdBy: string;

    @ManyToOne(() => User, user => user.sentMessages)
    @ApiProperty({ type: () => User, description: 'The sender of the message' })
    sender: User;

    @ManyToOne(() => User, user => user.receivedMessages)
    @ApiProperty({ type: () => User, description: 'The receiver of the message' })
    receiver: User;

    @ManyToOne(() => Group, group => group.messages)
    @ApiProperty({ type: () => Group, description: 'The group this message belongs to' })
    group: Group;

    @OneToMany(() => File, file => file.message, { cascade: true })
    @ApiProperty({ type: () => [File], description: 'The files attached to the message' })
    files: File[];

    @OneToMany(() => ReadReceipt, readReceipt => readReceipt.message, { cascade: true })
    @ApiProperty({ type: () => [ReadReceipt], description: 'The read receipts for the message' })
    readReceipts: ReadReceipt[];
}
