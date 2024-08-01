import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteRoomReviewDTO {
  @ApiProperty({ example: 'id of review', type: String })
  @IsNotEmpty()
  @IsString()
  idRoomReview: string;
}
