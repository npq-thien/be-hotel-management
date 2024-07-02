import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpCommand } from './command/sign.up.command';
import { Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand, string> {
  @Inject()
  private readonly authService: AuthService;

  async execute(command: SignUpCommand): Promise<string> {
    return await this.authService.signUp(command);
  }
}
