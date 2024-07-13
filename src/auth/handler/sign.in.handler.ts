import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { SignInCommand } from './command/sign.in.command';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand, any> {
  @Inject()
  private readonly authService: AuthService;

  async execute(command: SignInCommand): Promise<any> {
    return await this.authService.signIn(command);
  }
}
