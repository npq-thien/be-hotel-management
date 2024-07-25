import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetDetailProfileDTO {
  @ApiProperty({ example: 'profile Id', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;
}
