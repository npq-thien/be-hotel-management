import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RoomService } from '../room.service';
import { GetAllRoomTypesQuery } from './query/get.all.room.types.query';
import { GetAllRoomTypesResult } from '../result/get.all.room.types.result';

@QueryHandler(GetAllRoomTypesQuery)
export class GetAllRoomTypesHandler
  implements IQueryHandler<GetAllRoomTypesQuery, GetAllRoomTypesResult>
{
  @Inject()
  private readonly roomService: RoomService;

  async execute(query: GetAllRoomTypesQuery): Promise<GetAllRoomTypesResult> {
    return await this.roomService.getAllRoomTypes(query);
  }
}
