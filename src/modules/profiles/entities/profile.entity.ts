import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The unique identifier of the profile' })
  id: string;

  @Column()
  @ApiProperty({ description: 'The ID of the user this profile belongs to' })
  userId: string;

  @Column()
  @ApiProperty({ description: 'The first name of the user' })
  firstName: string;

  @Column()
  @ApiProperty({ description: 'The last name of the user' })
  lastName: string;

  @Column()
  @ApiProperty({ description: 'The gender of the user' })
  gender: string;

  @Column()
  @ApiProperty({ description: 'The avatar of the user' })
  avatar: string;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'The date when the user was created' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'The date when the user was last updated' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.profile)
  @ApiProperty({
    type: () => User,
    description: 'The user this profile belongs to',
  })
  user: User;
}
