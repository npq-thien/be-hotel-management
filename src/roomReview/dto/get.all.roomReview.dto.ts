import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetAllRoomReviewDTO {
  @ApiProperty({ example: 'roomType Id', required: false })
  @IsString()
  @IsOptional()
  roomTypeId?: string;
}
