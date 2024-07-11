import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoomTypeCommand } from './command/create.room.type.command';
import { Inject } from '@nestjs/common';
import { RoomService } from '../room.service';

@CommandHandler(CreateRoomTypeCommand)
export class CreateRoomTypeHandler
  implements ICommandHandler<CreateRoomTypeCommand, string>
{
  @Inject()
  private readonly roomService: RoomService;

  async execute(command: CreateRoomTypeCommand): Promise<string> {
    return await this.roomService.createRoom(command);
  }
}
