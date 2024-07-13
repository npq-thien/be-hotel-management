import { ICommand } from '@nestjs/cqrs';

export class SignUpCommand implements ICommand {
  fullName: string;
  email: string;
  phone?: string;
  username: string;
  password: string;
  confirmPassword: string;

  constructor(data: Partial<SignUpCommand>) {
    Object.assign(this, data);
  }
}
