import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDetailRoomTypeQuery } from './query/get.detail.room.type.query';
import { GetDetailRoomTypeResult } from '../result/get.detail.room.type.result';
import { Inject } from '@nestjs/common';
import { RoomService } from '../room.service';

@QueryHandler(GetDetailRoomTypeQuery)
export class GetDetailRoomTypeHandler
  implements IQueryHandler<GetDetailRoomTypeQuery, GetDetailRoomTypeResult>
{
  @Inject()
  private readonly roomService: RoomService;

  async execute(
    query: GetDetailRoomTypeQuery,
  ): Promise<GetDetailRoomTypeResult> {
    return await this.roomService.getDetailRoomType(query.id);
  }
}
