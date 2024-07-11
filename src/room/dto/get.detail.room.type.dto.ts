import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetDetailRoomTypeDTO {
  @ApiProperty({ example: 'id room', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;
}
