import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './jwt.config';
import { AuthController } from './auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { SignUpHandler } from './handler/sign.up.handler';
import { AuthService } from './auth.service';
import { SignInHandler } from './handler/sign.in.handler';

const handler = [SignUpHandler, SignInHandler];

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConfig.access,
      signOptions: { expiresIn: jwtConfig.expiresIn.access },
    }),
    CqrsModule,
  ],
  providers: [...handler, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
