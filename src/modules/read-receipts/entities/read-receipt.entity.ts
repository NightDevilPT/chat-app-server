import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Message } from 'src/modules/messages/entities/message.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('read_receipts')
export class ReadReceipt {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'The unique identifier of the read receipt' })
    id: string;

    @Column()
    @ApiProperty({ description: 'The ID of the message this receipt belongs to' })
    messageId: string;

    @Column()
    @ApiProperty({ description: 'The ID of the user who read the message' })
    userId: string;

    @Column()
    @ApiProperty({ description: 'The status of the read receipt' })
    status: string;

    @Column({ type: 'timestamp' })
    @ApiProperty({ description: 'The date when the message was read' })
    readAt: Date;

    @CreateDateColumn({ type: 'timestamp' })
    @ApiProperty({ description: 'The date when the user was created' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @ApiProperty({ description: 'The date when the user was last updated' })
    updatedAt: Date;

    @Column()
    @ApiProperty({ description: 'The ID of the user who created the read receipt' })
    createdBy: string;

    @ManyToOne(() => Message, message => message.readReceipts)
    @ApiProperty({ type: () => Message, description: 'The message this receipt belongs to' })
    message: Message;

    @ManyToOne(() => User, user => user.readReceipts)
    @ApiProperty({ type: () => User, description: 'The user who read the message' })
    user: User;
}
