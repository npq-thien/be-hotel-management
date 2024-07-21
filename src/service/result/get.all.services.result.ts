import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class GetAllServicesItem {
  @Expose()
  id: string;
  @Expose()
  serviceName: string;
  @Expose()
  title: string;
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

export class GetAllServicesResult implements IQueryResult {
  @Expose()
  items: GetAllServicesItem[];
  @Expose()
  total: number;
}
