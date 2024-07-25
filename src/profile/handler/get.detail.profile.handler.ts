import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDetailProfileQuery } from './query/get.detail.profile.query';
import { GetDetailProfileResult } from '../result/get.detail.profile.result';
import { ProfileService } from '../profile.service';
import { Inject } from '@nestjs/common';

@QueryHandler(GetDetailProfileQuery)
export class GetDetailProfileHandler
  implements IQueryHandler<GetDetailProfileQuery, GetDetailProfileResult>
{
  @Inject()
  private readonly profileService: ProfileService;

  async execute(query: GetDetailProfileQuery): Promise<GetDetailProfileResult> {
    return await this.profileService.getDetailProfile(query.id);
  }
}
