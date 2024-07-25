import { ICommand } from '@nestjs/cqrs';

export class DeleteProfileCommand implements ICommand {
  id: string;

  constructor(data: DeleteProfileCommand) {
    Object.assign(this, data);
  }
}
