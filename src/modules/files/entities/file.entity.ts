import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Message } from 'src/modules/messages/entities/message.entity';

@Entity('files')
export class File {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'The unique identifier of the file' })
    id: string;

    @Column()
    @ApiProperty({ description: 'The ID of the message this file belongs to' })
    messageId: string;

    @Column()
    @ApiProperty({ description: 'The path of the file' })
    filePath: string;

    @Column()
    @ApiProperty({ description: 'The type of the file' })
    fileType: string;

    @CreateDateColumn({ type: 'timestamp' })
    @ApiProperty({ description: 'The date when the user was created' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @ApiProperty({ description: 'The date when the user was last updated' })
    updatedAt: Date;

    @Column()
    @ApiProperty({ description: 'The ID of the user who created the file' })
    createdBy: string;

    @ManyToOne(() => Message, message => message.files)
    @ApiProperty({ type: () => Message, description: 'The message this file belongs to' })
    message: Message;
}
