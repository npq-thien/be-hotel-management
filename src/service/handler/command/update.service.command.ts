import { ICommand } from '@nestjs/cqrs';

export class UpdateServiceCommand implements ICommand {
  id: string;
  title?: string;
  serviceName?: string;
  introduction?: string;
  description?: string;
  price?: number;

  constructor(data: UpdateServiceCommand) {
    Object.assign(this, data);
  }
}
