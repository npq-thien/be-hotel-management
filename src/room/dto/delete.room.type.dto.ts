import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteRoomTypeDTO {
  @ApiProperty({ example: 'id', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;
}
