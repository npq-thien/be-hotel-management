import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateServiceCommand } from './command/update.service.command';
import { Inject } from '@nestjs/common';
import { ServiceService } from '../service.service';

@CommandHandler(UpdateServiceCommand)
export class UpdateServiceHandler
  implements ICommandHandler<UpdateServiceCommand, string>
{
  @Inject()
  private readonly serviceService: ServiceService;

  async execute(command: UpdateServiceCommand): Promise<string> {
    return await this.serviceService.updateService(command);
  }
}
