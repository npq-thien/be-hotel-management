import { ICommand } from '@nestjs/cqrs';

export class DeleteRoomReviewCommand implements ICommand {
  idRoomReview: string;

  constructor(data: DeleteRoomReviewCommand) {
    Object.assign(this, data);
  }
}
