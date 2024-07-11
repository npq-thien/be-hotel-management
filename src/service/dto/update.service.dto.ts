import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateServiceDTO {
  @ApiProperty({ example: 'Spa', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ required: false, example: '', type: String })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false, example: 'Spa', type: String })
  @IsOptional()
  @IsString()
  serviceName?: string;

  @ApiProperty({ required: false, example: '', type: String })
  @IsOptional()
  @IsString()
  introduction?: string;

  @ApiProperty({ required: false, example: '', type: String })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false, example: 0, type: Number })
  @IsOptional()
  @IsNumber()
  price?: number;
}
