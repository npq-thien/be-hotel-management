import { IQuery } from '@nestjs/cqrs';

export class GetDetailServiceQuery implements IQuery {
  id: string;

  constructor(data: GetDetailServiceQuery) {
    Object.assign(this, data);
  }
}
