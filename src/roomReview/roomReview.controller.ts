import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRoomReviewDTO } from './dto/create.roomReview.dto';
import { CreateRoomReviewCommand } from './handler/command/create.roomReview.command';
import { GetUser } from 'libs/getuser.decorator';
import { AuthGuard } from '@nestjs/passport';
import { GetAllRoomReviewDTO } from './dto/get.all.roomReview.dto';
import { GetAllRoomReviewQuery } from './handler/query/get.all.roomReview.query';
import { DeleteRoomReviewDTO } from './dto/delete.roomReview.dto';
import { DeleteRoomReviewCommand } from './handler/command/delete.roomReview.command';

@ApiTags('room-review')
@Controller('room-review')
export class RoomReviewController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('/')
  async getAllRoomReview(@Query() q: GetAllRoomReviewDTO) {
    const query = new GetAllRoomReviewQuery(q);
    return await this.queryBus.execute(query);
  }

  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async createRoomReview(
    @GetUser() user: { id: string },
    @Body() body: CreateRoomReviewDTO,
  ) {
    const command = new CreateRoomReviewCommand({
      ...body,
      customerId: user.id,
    });
    return await this.commandBus.execute(command);
  }

  @Post('/delete')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async deleteRoomReview(@Body() body: DeleteRoomReviewDTO) {
    const command = new DeleteRoomReviewCommand({
      ...body,
    });
    return await this.commandBus.execute(command);
  }
}
