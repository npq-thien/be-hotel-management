import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class SignInResult implements IQueryResult {
  @Expose()
  token: string;
  @Expose()
  username: string;
}
