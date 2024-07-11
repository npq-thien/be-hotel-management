import { IQuery } from '@nestjs/cqrs';

export class GetAllServicesQuery implements IQuery {
  constructor(data: GetAllServicesQuery) {
    Object.assign(this, data);
  }
}
