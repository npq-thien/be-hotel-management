import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class GetAllRoomTypesItem {
  @Expose()
  id: string;
  @Expose()
  typeName: string;
  @Expose()
  thumbnail: string;
  @Expose()
  imageUrls: string[];
  @Expose()
  amenities: string[];
  @Expose()
  introduction: string;
  @Expose()
  description: string;
  @Expose()
  size: number;
  @Expose()
  occupancy: string;
  @Expose()
  beds: string;
  @Expose()
  price: number;
}

export class GetAllRoomTypesResult implements IQueryResult {
  @Expose()
  items: GetAllRoomTypesItem[];
  @Expose()
  total: number;
}
