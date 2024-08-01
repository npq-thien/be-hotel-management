import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RoomReviewService } from './roomReview.service';
import { RoomReviewController } from './roomReview.controller';
import { CreateRoomReviewHandler } from './handler/create.roomReview.handler';
import { GetAllRoomReviewHandler } from './handler/get.all.roomReview.handler';
import { DeleteRoomReviewHandler } from './handler/delete.roomReview.handler';

const handler = [
  CreateRoomReviewHandler,
  GetAllRoomReviewHandler,
  DeleteRoomReviewHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [...handler, RoomReviewService],
  controllers: [RoomReviewController],
})
export class RoomReviewModule {}
