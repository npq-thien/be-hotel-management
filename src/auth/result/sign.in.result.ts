import { Expose } from 'class-transformer';

export class SignInResult {
  @Expose()
  token: string;
  @Expose()
  fullName: string;
}
