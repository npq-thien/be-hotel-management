import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { GetAllRoomTypesHandler } from './handler/get.all.room.types.handler';
import { GetDetailRoomTypeHandler } from './handler/get.detail.room.type.handler';
import { CreateRoomTypeHandler } from './handler/create.room.type.handler';
import { UpdateRoomTypeHandler } from './handler/update.room.type.handler';
import { DeleteRoomTypeHandler } from './handler/delete.room.type.handler';

const handler = [
  GetAllRoomTypesHandler,
  GetDetailRoomTypeHandler,
  CreateRoomTypeHandler,
  UpdateRoomTypeHandler,
  DeleteRoomTypeHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [...handler, RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
