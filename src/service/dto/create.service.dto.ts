import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateServiceDTO {
  @ApiProperty({ example: 'Spa', type: String })
  @IsNotEmpty()
  @IsString()
  serviceName: string;

  @ApiProperty({ example: '', type: String })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: '', type: String })
  @IsNotEmpty()
  @IsString()
  introduction: string;

  @ApiProperty({ example: '', type: String })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 0, type: Number })
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
