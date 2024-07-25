import { IQuery } from '@nestjs/cqrs';

export class GetDetailProfileQuery implements IQuery {
  id: string;

  constructor(data: GetDetailProfileQuery) {
    Object.assign(this, data);
  }
}