import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class GetDetailServiceResult implements IQueryResult {
  @Expose()
  id: string;
  @Expose()
  serviceName: string;
  @Expose()
  thumbnail: string;
  @Expose()
  imageUrls: string[];
  @Expose()
  introduction: string;
  @Expose()
  description: string;
  @Expose()
  price: number;
}
