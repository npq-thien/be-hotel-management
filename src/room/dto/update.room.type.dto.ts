import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsNumber,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class UpdateRoomTypeDTO {
  @ApiProperty({ example: 'Id', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ required: false, example: 'Double Room', type: String })
  @IsOptional()
  @IsString()
  typeName?: string;

  @ApiProperty({ required: false, example: 'Up to 4 people', type: String })
  @IsOptional()
  @IsString()
  capacity?: string;

  @ApiProperty({ required: false, example: 400, type: Number })
  @IsOptional()
  @IsNumber()
  size?: number;

  @ApiProperty({ required: false, example: [], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @ApiProperty({ required: false, example: '', type: String })
  @IsOptional()
  @IsString()
  occupancy?: string;

  @ApiProperty({ required: false, example: '', type: String })
  @IsOptional()
  @IsString()
  beds?: string;

  @ApiProperty({ required: false, example: '', type: String })
  @IsOptional()
  @IsString()
  bathrooms?: string;

  @ApiProperty({ required: false, example: '', type: String })
  @IsOptional()
  @IsString()
  introduction?: string;

  @ApiProperty({ required: false, example: '', type: String })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false, example: 1, type: Number })
  @IsOptional()
  @IsNumber()
  price?: number;
}
