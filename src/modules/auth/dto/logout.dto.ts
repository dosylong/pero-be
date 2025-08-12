import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class LogoutDto {
  @ApiProperty({ description: 'User ID' })
  @IsString()
  @IsUUID()
  userId: string;
}
