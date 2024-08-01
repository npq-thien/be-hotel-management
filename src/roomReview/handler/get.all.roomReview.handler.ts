import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllRoomReviewQuery } from './query/get.all.roomReview.query';
import { GetALlRoomReviewResult } from './result/get.all.roomReview.result';
import { Inject } from '@nestjs/common';
import { RoomReviewService } from '../roomReview.service';

@QueryHandler(GetAllRoomReviewQuery)
export class GetAllRoomReviewHandler
  implements IQueryHandler<GetAllRoomReviewQuery, GetALlRoomReviewResult>
{
  @Inject()
  private readonly roomReviewService: RoomReviewService;

  async execute(query: GetAllRoomReviewQuery): Promise<GetALlRoomReviewResult> {
    return await this.roomReviewService.getAllRoomReview(query);
  }
}
