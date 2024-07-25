import { ICommandHandler, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDetailProfileQuery } from './query/get.detail.profile.query';
import { GetDetailProfileResult } from '../result/get.detail.profile.result';
import { ProfileService } from '../profile.service';
import { Inject } from '@nestjs/common';
import { DeleteProfileCommand } from './command/delete.profile.command';

@QueryHandler(DeleteProfileCommand)
export class DeleteProfileHandler
  implements ICommandHandler<DeleteProfileCommand, string>
{
  @Inject()
  private readonly profileService: ProfileService;

  async execute(command: DeleteProfileCommand): Promise<string> {
    return await this.profileService.deleteProfile(command);
  }
}
