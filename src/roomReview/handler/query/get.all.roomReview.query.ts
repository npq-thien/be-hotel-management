import { IQuery } from '@nestjs/cqrs';

export class GetAllRoomReviewQuery implements IQuery {
  roomTypeId?: string;

  constructor(data: GetAllRoomReviewQuery) {
    Object.assign(this, data);
  }
}
