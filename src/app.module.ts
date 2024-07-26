import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'libs/database.module';
import { AuthModule } from './auth/auth.module';
import { UtilityModule } from 'libs/utility.module';
import { RoomModule } from './room/room.module';
import { ServiceModule } from './service/service.module';
import { FirebaseModule } from 'libs/firebase.module';
import { TestModule } from './test/test.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UtilityModule,
    FirebaseModule,
    AuthModule,
    RoomModule,
    ServiceModule,
    ProfileModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
