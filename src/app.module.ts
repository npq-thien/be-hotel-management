import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'libs/database.module';
<<<<<<< HEAD
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true })],
=======
import { AuthModule } from './auth/auth.module';
import { UtilityModule } from 'libs/utility.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UtilityModule,
    AuthModule,
  ],
>>>>>>> origin/develop
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
