import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignUpDTO } from './dto/sign.up.dto';
import { SignUpCommand } from './handler/command/sign.up.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignInDTO } from './dto/sign.in.dto';
import { SignInQuery } from './handler/query/sign.in.query';

@ApiTags('auth')
// @ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Post('signUp')
  async signUp(@Body() body: SignUpDTO) {
    const command = new SignUpCommand(body);
    return await this.commandBus.execute(command);
  }

  @Get('signIn')
  async signIn(@Query() q: SignInDTO) {
    const query = new SignInQuery(q);
    return await this.queryBus.execute(query);
  }
}
