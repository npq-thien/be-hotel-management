import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateRoomReviewDTO {
  @ApiProperty({
    description: 'ID of the room type',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  roomTypeId: string;

  @ApiProperty({ description: 'ID of the customer', type: String })
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @ApiProperty({
    example: 'This room is warm, convenient and has great service',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  content: string;

  @ApiProperty({ example: 4, type: Number })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  star: number;

  @ApiProperty({ type: Date })
  @IsOptional()
  reviewDate: Date;
}
