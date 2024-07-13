import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignUpDTO } from './dto/sign.up.dto';
import { SignUpCommand } from './handler/command/sign.up.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignInDTO } from './dto/sign.in.dto';
import { SignInCommand } from './handler/command/sign.in.command';

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

  @Post('signIn')
  async signIn(@Body() body: SignInDTO) {
    const query = new SignInCommand(body);
    return await this.commandBus.execute(query);
  }
}
