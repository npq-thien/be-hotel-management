import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import { plainToClass } from 'class-transformer';
import { GetDetailRoomTypeResult } from './result/get.detail.room.type.result';
import {
  GetAllRoomTypesItem,
  GetAllRoomTypesResult,
} from './result/get.all.room.types.result';
import { GetAllRoomTypesQuery } from './handler/query/get.all.room.types.query';
import { CreateRoomTypeCommand } from './handler/command/create.room.type.command';
import { FirebaseService } from 'libs/firebase.module';
import { UpdateRoomTypeCommand } from './handler/command/update.room.type.command';
import { DeleteRoomTypeCommand } from './handler/command/delete.room.type.command';

@Injectable()
export class RoomService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;
  @Inject()
  private readonly firebase: FirebaseService;

  async getAllRoomTypes(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: GetAllRoomTypesQuery,
  ): Promise<GetAllRoomTypesResult> {
    const [data, total] = await Promise.all([
      this.prisma.roomType.findMany(),
      this.prisma.roomType.count(),
    ]);
    return {
      items: await Promise.all(
        data.map(async (i) => {
          const thumbnail = await this.firebase.getAuthenticatedFileUrl(
            i.thumbnail,
          );
          const imageUrls = await Promise.all(
            i.imageUrls.map(async (image) => {
              const url = await this.firebase.getAuthenticatedFileUrl(image);
              return url;
            }),
          );
          return plainToClass(
            GetAllRoomTypesItem,
            { ...i },
            {
              excludeExtraneousValues: true,
            },
          );
        }),
      ),
      total,
    };
  }

  async getDetailRoomType(id: string): Promise<GetDetailRoomTypeResult> {
    const data = await this.prisma.roomType.findUnique({
      where: { id },
    });
    const thumbnail = await this.firebase.getAuthenticatedFileUrl(
      data.thumbnail,
    );
    const imageUrls = await Promise.all(
      data.imageUrls.map(async (image) => {
        const url = await this.firebase.getAuthenticatedFileUrl(image);
        return url;
      }),
    );
    return plainToClass(
      GetDetailRoomTypeResult,
      { ...data },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async createRoom(data: CreateRoomTypeCommand): Promise<string> {
    const thumbnail = await this.firebase.uploadImage(data.images[0]);
    const images = data.images.slice(1);
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const url = await this.firebase.uploadImage(image);
        return url;
      }),
    );
    const id = this.util.generateId();
    await this.prisma.roomType.create({
      data: {
        ...data,
        id,
        thumbnail,
        imageUrls,
      },
    });
    return 'Created successfully';
  }

  async updateRoomType(data: UpdateRoomTypeCommand): Promise<string> {
    const item = await this.prisma.roomType.findUnique({
      where: { id: data.id },
    });
    if (item) {
      for (const [prop, value] of Object.entries(item)) {
        item[prop] = data[prop] ? data[prop] : value;
      }
      await this.prisma.roomType.update({ data: item, where: { id: item.id } });
      return 'Updated successfully';
    } else {
      throw new HttpException(
        'Room Type does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteRoomType(data: DeleteRoomTypeCommand): Promise<string> {
    const item = await this.prisma.roomType.findUnique({
      where: { id: data.id },
    });
    if (item) {
      await this.prisma.roomType.delete({ where: { id: item.id } });
      return 'Deleted successfully';
    } else {
      throw new HttpException(
        'Room Type does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
