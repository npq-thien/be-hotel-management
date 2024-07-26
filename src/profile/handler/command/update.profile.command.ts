import { ICommand } from '@nestjs/cqrs';

export class UpdateProfileCommand implements ICommand {
  id: string;
  username?: string;
  fullName?: string;
  email?: string;
  phone?: string;

  constructor(data: UpdateProfileCommand) {
    Object.assign(this, data);
  }
}
