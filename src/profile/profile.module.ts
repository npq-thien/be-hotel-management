import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetDetailProfileHandler } from './handler/get.detail.profile.handler';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UpdateProfileHandler } from './handler/update.profile.handler';
import { DeleteProfileHandler } from './handler/delete.profile.handler';

const handler = [
  GetDetailProfileHandler,
  UpdateProfileHandler,
  DeleteProfileHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [...handler, ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
