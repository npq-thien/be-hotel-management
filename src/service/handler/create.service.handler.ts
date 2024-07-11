import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateServiceCommand } from './command/create.service.command';
import { Inject } from '@nestjs/common';
import { ServiceService } from '../service.service';

@CommandHandler(CreateServiceCommand)
export class CreateServiceHandler
  implements ICommandHandler<CreateServiceCommand, string>
{
  @Inject()
  private readonly serviceService: ServiceService;

  async execute(command: CreateServiceCommand): Promise<string> {
    return await this.serviceService.createService(command);
  }
}
