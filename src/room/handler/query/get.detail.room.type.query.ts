import { IQuery } from '@nestjs/cqrs';

export class GetDetailRoomTypeQuery implements IQuery {
  id: string;

  constructor(data: GetDetailRoomTypeQuery) {
    Object.assign(this, data);
  }
}
