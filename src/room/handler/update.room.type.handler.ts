import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRoomTypeCommand } from './command/update.room.type.command';
import { Inject } from '@nestjs/common';
import { RoomService } from '../room.service';

@CommandHandler(UpdateRoomTypeCommand)
export class UpdateRoomTypeHandler
  implements ICommandHandler<UpdateRoomTypeCommand, string>
{
  @Inject()
  private readonly roomService: RoomService;

  async execute(command: UpdateRoomTypeCommand): Promise<string> {
    return await this.roomService.updateRoomType(command);
  }
}
