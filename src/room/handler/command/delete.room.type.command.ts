import { ICommand } from '@nestjs/cqrs';

export class DeleteRoomTypeCommand implements ICommand {
  id: string;

  constructor(data: DeleteRoomTypeCommand) {
    Object.assign(this, data);
  }
}
