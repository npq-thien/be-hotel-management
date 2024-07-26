import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProfileService } from '../profile.service';
import { Inject } from '@nestjs/common';
import { DeleteProfileCommand } from './command/delete.profile.command';

@CommandHandler(DeleteProfileCommand)
export class DeleteProfileHandler
  implements ICommandHandler<DeleteProfileCommand, string>
{
  @Inject()
  private readonly profileService: ProfileService;

  async execute(command: DeleteProfileCommand): Promise<string> {
    return await this.profileService.deleteProfile(command);
  }
}
