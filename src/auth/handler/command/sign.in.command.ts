import { ICommand } from '@nestjs/cqrs';

export class SignInCommand implements ICommand {
  username: string;
  password: string;

  constructor(data: Partial<SignInCommand>) {
    Object.assign(this, data);
  }
}
