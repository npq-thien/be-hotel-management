import { ICommand } from '@nestjs/cqrs';

export class DeleteServiceCommand implements ICommand {
  id: string;

  constructor(data: DeleteServiceCommand) {
    Object.assign(this, data);
  }
}
