import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpDTO {
  @ApiProperty({ example: 'Nguyen Van A', type: String })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({ example: 'a@gmail.com', type: String })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ required: false, example: '0123456789', type: String })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({ example: 'username1', type: String })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: '123456', type: String })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: '123456', type: String })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
