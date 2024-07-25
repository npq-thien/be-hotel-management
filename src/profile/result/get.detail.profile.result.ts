import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class GetDetailProfileResult implements IQueryResult {
  @Expose()
  username: string;
  @Expose()
  fullName: string;
  @Expose()
  email: string;
  @Expose()
  phone: string;
}
