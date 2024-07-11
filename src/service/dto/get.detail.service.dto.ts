import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetDetailServiceDTO {
  @ApiProperty({ example: 'id Service', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;
}
