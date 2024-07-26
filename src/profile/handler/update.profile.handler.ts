import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProfileCommand } from './command/update.profile.command';
import { Inject } from '@nestjs/common';
import { ProfileService } from '../profile.service';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  implements ICommandHandler<UpdateProfileCommand, string>
{
  @Inject()
  private readonly profileService: ProfileService;

  async execute(command: UpdateProfileCommand): Promise<string> {
    return await this.profileService.updateProfile(command);
  }
}
