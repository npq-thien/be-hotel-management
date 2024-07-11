import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllServicesQuery } from './query/get.all.services.query';
import { GetAllServicesResult } from '../result/get.all.services.result';
import { Inject } from '@nestjs/common';
import { ServiceService } from '../service.service';

@QueryHandler(GetAllServicesQuery)
export class GetAllServicesHandler
  implements IQueryHandler<GetAllServicesQuery, GetAllServicesResult>
{
  @Inject()
  private readonly serviceService: ServiceService;

  async execute(query: GetAllServicesQuery): Promise<GetAllServicesResult> {
    return await this.serviceService.getAllServices(query);
  }
}
