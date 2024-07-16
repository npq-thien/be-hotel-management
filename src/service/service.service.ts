import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  GetAllServicesItem,
  GetAllServicesResult,
} from './result/get.all.services.result';
import { FirebaseService } from 'libs/firebase.module';
import { plainToClass } from 'class-transformer';
import { GetDetailServiceResult } from './result/get.detail.service.result';
import { GetAllServicesQuery } from './handler/query/get.all.services.query';
import { CreateServiceCommand } from './handler/command/create.service.command';
import { UpdateServiceCommand } from './handler/command/update.service.command';
import { DeleteServiceCommand } from './handler/command/delete.service.command';

@Injectable()
export class ServiceService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;
  @Inject()
  private readonly firebase: FirebaseService;

  async getAllServices(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: GetAllServicesQuery,
  ): Promise<GetAllServicesResult> {
    const [data, total] = await Promise.all([
      this.prisma.service.findMany(),
      this.prisma.service.count(),
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
            GetAllServicesItem,
            { ...i },
            { excludeExtraneousValues: true },
          );
        }),
      ),
      total,
    };
  }

  async getDetailService(id: string): Promise<GetDetailServiceResult> {
    const data = await this.prisma.service.findUnique({ where: { id } });
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
      GetDetailServiceResult,
      { ...data },
      { excludeExtraneousValues: true },
    );
  }

  async createService(data: CreateServiceCommand): Promise<string> {
    const thumbnail = await this.firebase.uploadImage(data.images[0]);
    const images = data.images.slice(1);
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const url = await this.firebase.uploadImage(image);
        return url;
      }),
    );
    const id = this.util.generateId();
    await this.prisma.service.create({
      data: {
        ...data,
        id,
        thumbnail,
        imageUrls,
      },
    });
    return 'Created successfully';
  }

  async updateService(data: UpdateServiceCommand): Promise<string> {
    const item = await this.prisma.service.findUnique({
      where: { id: data.id },
    });
    if (item) {
      for (const [prop, value] of Object.entries(item)) {
        item[prop] = data[prop] ? data[prop] : value;
      }
      await this.prisma.service.update({ data: item, where: { id: item.id } });
      return 'Updated successfully';
    } else {
      throw new HttpException('Service does not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteService(data: DeleteServiceCommand): Promise<string> {
    const item = await this.prisma.service.findUnique({
      where: { id: data.id },
    });
    if (item) {
      await this.prisma.service.delete({ where: { id: item.id } });
      return 'Deleted successfully';
    } else {
      throw new HttpException('Service does not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
