import { ICommand } from '@nestjs/cqrs';

export class CreateRoomTypeCommand implements ICommand {
  typeName: string;
  capacity?: string;
  size: number;
  amenities: string[];
  occupancy: string;
  beds: string;
  bathrooms: string;
  introduction: string;
  description?: string;
  images: Express.Multer.File[]; // First image is thumnail, the others are imageUrls
  price: number;

  constructor(data: CreateRoomTypeCommand) {
    Object.assign(this, data);
  }
}
