import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRoomReviewCommand } from './command/delete.roomReview.command';
import { Inject } from '@nestjs/common';
import { RoomReviewService } from '../roomReview.service';

@CommandHandler(DeleteRoomReviewCommand)
export class DeleteRoomReviewHandler
  implements ICommandHandler<DeleteRoomReviewCommand, string>
{
  @Inject()
  private readonly roomReviewService: RoomReviewService;

  async execute(command: DeleteRoomReviewCommand): Promise<string> {
    return await this.roomReviewService.deleteRoomReview(command);
  }
}
