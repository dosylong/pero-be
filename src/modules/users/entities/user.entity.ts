import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../common/enums/user-role.enum';

@Entity('users')
export class User {
  @ApiProperty({ description: 'User unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'User role' })
  @Column({ type: 'varchar', enum: UserRole, default: UserRole.USER })
  role?: UserRole | null;

  @ApiProperty({ description: 'User email address' })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ApiProperty({ description: 'User first name' })
  @Column()
  firstName: string;

  @ApiProperty({ description: 'User last name' })
  @Column()
  lastName: string;

  @ApiProperty({ description: 'User creation timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'User last update timestamp' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'Hashed refresh token', required: false })
  @Column({ type: 'varchar', length: 255, nullable: true, select: false })
  refreshTokenHash?: string | null;
}
