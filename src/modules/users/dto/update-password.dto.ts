import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ description: 'User old password', minLength: 8 })
  @IsString()
  @MinLength(8)
  oldPassword: string;

  @ApiProperty({ description: 'User new password', minLength: 8 })
  @IsString()
  @MinLength(8)
  newPassword: string;
}
