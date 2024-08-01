import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class GetAllRoomReviewItem {
  @Expose()
  id: string;
  @Expose()
  roomTypeId: string;
  @Expose()
  customerFullName: string;
  @Expose()
  content: string;
  @Expose()
  star: number;
  @Expose()
  reviewDate: Date;
}

export class GetALlRoomReviewResult implements IQueryResult {
  @Expose()
  items: GetAllRoomReviewItem[];
  @Expose()
  total: number;
  @Expose()
  averageStar: number;
}
