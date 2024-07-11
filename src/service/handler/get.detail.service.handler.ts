import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDetailServiceQuery } from './query/get.detail.service.query';
import { GetDetailServiceResult } from '../result/get.detail.service.result';
import { Inject } from '@nestjs/common';
import { ServiceService } from '../service.service';

@QueryHandler(GetDetailServiceQuery)
export class GetDetailServiceHandler
  implements IQueryHandler<GetDetailServiceQuery, GetDetailServiceResult>
{
  @Inject()
  private readonly serviceService: ServiceService;

  async execute(query: GetDetailServiceQuery): Promise<GetDetailServiceResult> {
    return await this.serviceService.getDetailService(query.id);
  }
}
