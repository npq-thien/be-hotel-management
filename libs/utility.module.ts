import { Global, Injectable, Module } from '@nestjs/common';
import { ObjectId } from 'bson';

@Injectable()
export class UtilityImplement {
  generateId() {
    return new ObjectId().toString();
  }
}

@Global()
@Module({
  imports: [],
  providers: [UtilityImplement],
  exports: [UtilityImplement],
})
export class UtilityModule {}
