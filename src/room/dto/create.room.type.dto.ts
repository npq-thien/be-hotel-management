import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRoomTypeDTO {
  @ApiProperty({ example: 'Double Room', type: String })
  @IsNotEmpty()
  @IsString()
  typeName: string;

  @ApiProperty({ required: false, example: 'Up to 4 people', type: String })
  @IsOptional()
  @IsString()
  capacity?: string;

  @ApiProperty({ example: 400, type: Number })
  @IsNotEmpty()
  @IsNumber()
  size: number;

  @ApiProperty({ example: [], type: [String] })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  amenities: string[];

  @ApiProperty({ example: '', type: String })
  @IsNotEmpty()
  @IsString()
  occupancy: string;

  @ApiProperty({ example: '', type: String })
  @IsNotEmpty()
  @IsString()
  beds: string;

  @ApiProperty({ example: '', type: String })
  @IsNotEmpty()
  @IsString()
  bathrooms: string;

  @ApiProperty({ example: '', type: String })
  @IsNotEmpty()
  @IsString()
  introduction: string;

  @ApiProperty({ required: false, example: '', type: String })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1, type: Number })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Images',
    type: 'array',
    items: {
      type: 'file',
      items: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  images: Express.Multer.File[];
}
