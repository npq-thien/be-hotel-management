import { IQuery } from '@nestjs/cqrs';

export class GetAllRoomTypesQuery implements IQuery {
  constructor(data: GetAllRoomTypesQuery) {
    Object.assign(this, data);
  }
}
