import { IQuery } from '@nestjs/cqrs';

export class SignInQuery implements IQuery {
  username: string;
  password: string;

  constructor(data: Partial<SignInQuery>) {
    Object.assign(this, data);
  }
}
