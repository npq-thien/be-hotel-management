import { Global, Injectable, Module } from '@nestjs/common';
import { ObjectId } from 'bson';

@Injectable()
export class UtilityImplement {
  generateId() {
    return new ObjectId().toString();
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}

@Global()
@Module({
  imports: [],
  providers: [UtilityImplement],
  exports: [UtilityImplement],
})
export class UtilityModule {}
