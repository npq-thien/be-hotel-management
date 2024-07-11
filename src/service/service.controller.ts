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
import { GetAllServicesDTO } from './dto/get.all.services.dto';
import { GetAllServicesQuery } from './handler/query/get.all.services.query';
import { GetDetailServiceDTO } from './dto/get.detail.service.dto';
import { GetDetailServiceQuery } from './handler/query/get.detail.service.query';
import { CreateServiceDTO } from './dto/create.service.dto';
import { CreateServiceCommand } from './handler/command/create.service.command';
import { UpdateServiceDTO } from './dto/update.service.dto';
import { UpdateServiceCommand } from './handler/command/update.service.command';
import { DeleteServiceDTO } from './dto/delete.service.dto';
import { DeleteServiceCommand } from './handler/command/delete.service.command';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('service')
// @ApiBearerAuth()
@Controller('service')
export class ServiceController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('')
  async getAll(@Query() q: GetAllServicesDTO) {
    const query = new GetAllServicesQuery(q);
    return await this.queryBus.execute(query);
  }

  @Get('detail')
  async getDetai(@Query() q: GetDetailServiceDTO) {
    const query = new GetDetailServiceQuery(q);
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() body: CreateServiceDTO,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const command = new CreateServiceCommand({ ...body, images });
    return await this.commandBus.execute(command);
  }

  @Post('update')
  async update(@Body() body: UpdateServiceDTO) {
    const command = new UpdateServiceCommand(body);
    return await this.commandBus.execute(command);
  }

  @Post('delete')
  async delete(@Body() body: DeleteServiceDTO) {
    const command = new DeleteServiceCommand(body);
    return await this.commandBus.execute(command);
  }
}
