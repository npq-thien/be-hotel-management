import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SignInQuery } from './query/sign.in.query';
import { Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';

@QueryHandler(SignInQuery)
export class SignInHandler implements IQueryHandler<SignInQuery, any> {
  @Inject()
  private readonly authService: AuthService;

  async execute(query: SignInQuery): Promise<any> {
    return await this.authService.signIn(query);
  }
}
