import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteServiceDTO {
  @ApiProperty({ example: 'id service', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;
}
