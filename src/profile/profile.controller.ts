import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetDetailProfileQuery } from './handler/query/get.detail.profile.query';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'libs/getuser.decorator';
import { UpdateProfileCommand } from './handler/command/update.profile.command';
import { UpdateProfileDTO } from './dto/update.profile.dto';
import { DeleteProfileCommand } from './handler/command/delete.profile.command';

@ApiTags('profile')
@Controller('profile')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ProfileController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('/detail')
  async getDetail(@GetUser() user: { id: string }) {
    const query = new GetDetailProfileQuery({ id: user.id });
    return await this.queryBus.execute(query);
  }

  @Post('/update')
  async updateProfile(
    @GetUser() user: { id: string },
    @Body() body: UpdateProfileDTO,
  ) {
    const command = new UpdateProfileCommand({ ...body, id: user.id });
    return await this.commandBus.execute(command);
  }

  @Post('/delete')
  async deleteProfile(@GetUser() user: { id: string }) {
    const command = new DeleteProfileCommand({ id: user.id });
    return await this.commandBus.execute(command);
  }
}
