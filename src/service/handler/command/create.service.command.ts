import { ICommand } from '@nestjs/cqrs';

export class CreateServiceCommand implements ICommand {
  serviceName: string;
  title: string;
  introduction: string;
  description: string;
  price: number;
  images: Express.Multer.File[];

  constructor(data: CreateServiceCommand) {
    Object.assign(this, data);
  }
}
