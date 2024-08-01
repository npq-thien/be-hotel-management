import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDTO {
  @ApiProperty({ required: false, example: 'username1', type: String })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ required: false, example: 'Nguyen Van A', type: String })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ required: false, example: 'a@example.com', type: String })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false, example: '012345689', type: String })
  @IsOptional()
  @IsString()
  phone?: string;
}
