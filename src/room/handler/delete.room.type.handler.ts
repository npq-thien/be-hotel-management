import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRoomTypeCommand } from './command/delete.room.type.command';
import { Inject } from '@nestjs/common';
import { RoomService } from '../room.service';

@CommandHandler(DeleteRoomTypeCommand)
export class DeleteRoomTypeHandler
  implements ICommandHandler<DeleteRoomTypeCommand, string>
{
  @Inject()
  private readonly roomService: RoomService;

  async execute(command: DeleteRoomTypeCommand): Promise<string> {
    return await this.roomService.deleteRoomType(command);
  }
}
