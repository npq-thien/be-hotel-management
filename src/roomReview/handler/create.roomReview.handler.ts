import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoomReviewCommand } from './command/create.roomReview.command';
import { Inject } from '@nestjs/common';
import { RoomReviewService } from '../roomReview.service';

@CommandHandler(CreateRoomReviewCommand)
export class CreateRoomReviewHandler
  implements ICommandHandler<CreateRoomReviewCommand, string>
{
  @Inject()
  private readonly roomReviewService: RoomReviewService;

  async execute(command: CreateRoomReviewCommand): Promise<string> {
    return await this.roomReviewService.createRoomRevivew(command);
  }
}
