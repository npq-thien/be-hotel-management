import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteServiceCommand } from './command/delete.service.command';
import { Inject } from '@nestjs/common';
import { ServiceService } from '../service.service';

@CommandHandler(DeleteServiceCommand)
export class DeleteServiceHandler
  implements ICommandHandler<DeleteServiceCommand, string>
{
  @Inject()
  private readonly serviceService: ServiceService;

  async execute(command: DeleteServiceCommand): Promise<string> {
    return await this.serviceService.deleteService(command);
  }
}
