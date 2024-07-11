import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetAllRoomTypesDTO } from './dto/get.all.room.types.dto';
import { GetDetailRoomTypeDTO } from './dto/get.detail.room.type.dto';
import { GetAllRoomTypesQuery } from './handler/query/get.all.room.types.query';
import { GetDetailRoomTypeQuery } from './handler/query/get.detail.room.type.query';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateRoomTypeDTO } from './dto/create.room.type.dto';
import { CreateRoomTypeCommand } from './handler/command/create.room.type.command';
import { UpdateRoomTypeDTO } from './dto/update.room.type.dto';
import { UpdateRoomTypeCommand } from './handler/command/update.room.type.command';
import { DeleteRoomTypeDTO } from './dto/delete.room.type.dto';
import { DeleteRoomTypeCommand } from './handler/command/delete.room.type.command';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('')
  async getAll(@Query() q: GetAllRoomTypesDTO) {
    const query = new GetAllRoomTypesQuery(q);
    return await this.queryBus.execute(query);
  }

  @Get('detail')
  async getDetail(@Query() q: GetDetailRoomTypeDTO) {
    const query = new GetDetailRoomTypeQuery(q);
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  async createRoomType(
    @Body() body: CreateRoomTypeDTO,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const command = new CreateRoomTypeCommand({ ...body, images });
    return await this.commandBus.execute(command);
  }

  @Post('update')
  async updateRoomType(@Body() body: UpdateRoomTypeDTO) {
    const command = new UpdateRoomTypeCommand(body);
    return await this.commandBus.execute(command);
  }

  @Post('delete')
  async deleteRoomType(@Body() body: DeleteRoomTypeDTO) {
    const command = new DeleteRoomTypeCommand(body);
    return await this.commandBus.execute(command);
  }
}
