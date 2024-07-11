import { Module } from '@nestjs/common';
import { CreateServiceHandler } from './handler/create.service.handler';
import { DeleteServiceHandler } from './handler/detele.service.handler';
import { GetAllServicesHandler } from './handler/get.all.services.handler';
import { GetDetailServiceHandler } from './handler/get.detail.service.handler';
import { UpdateServiceHandler } from './handler/update.service.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';

const handler = [
  GetAllServicesHandler,
  GetDetailServiceHandler,
  CreateServiceHandler,
  UpdateServiceHandler,
  DeleteServiceHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [...handler, ServiceService],
  controllers: [ServiceController],
})
export class ServiceModule {}
