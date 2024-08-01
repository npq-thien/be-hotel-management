import { ICommand } from '@nestjs/cqrs';

export class CreateRoomReviewCommand implements ICommand {
  roomTypeId: string;
  customerId: string;
  content: string;
  star: number;
  reviewDate: Date;

  constructor(data: CreateRoomReviewCommand) {
    Object.assign(this, data);
  }
}
