import { ICommand } from '@nestjs/cqrs';

export class UpdateRoomTypeCommand implements ICommand {
  id: string;
  typeName?: string;
  capacity?: string;
  size?: number;
  amenities?: string[];
  occupancy?: string;
  beds?: string;
  bathrooms?: string;
  introduction?: string;
  description?: string;
  price?: number;

  constructor(data: UpdateRoomTypeCommand) {
    Object.assign(this, data);
  }
}
