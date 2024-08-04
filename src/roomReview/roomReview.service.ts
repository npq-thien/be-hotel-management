import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import { CreateRoomReviewCommand } from './handler/command/create.roomReview.command';
import { GetAllRoomReviewQuery } from './handler/query/get.all.roomReview.query';
import {
  GetAllRoomReviewItem,
  GetALlRoomReviewResult,
} from './handler/result/get.all.roomReview.result';
import { plainToClass } from 'class-transformer';
import { DeleteRoomReviewCommand } from './handler/command/delete.roomReview.command';

@Injectable()
export class RoomReviewService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async getAllRoomReview(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: GetAllRoomReviewQuery,
  ): Promise<GetALlRoomReviewResult> {
    let data, total, averageStar;

    if (!query.roomTypeId) {
      [data, total] = await Promise.all([
        this.prisma.roomReview.findMany({ include: { customer: true } }),
        this.prisma.roomReview.count(),
      ]);
    } else {
      const aggregations = await this.prisma.roomReview.aggregate({
        _avg: {
          star: true,
        },
        where: { roomTypeId: query.roomTypeId },
      });

      averageStar = Math.round(aggregations._avg.star * 10) / 10 || 0;

      [data, total] = await Promise.all([
        this.prisma.roomReview.findMany({
          where: { roomTypeId: query.roomTypeId },
          include: { customer: true },
          orderBy: {
            reviewDate: 'desc',
          },
        }),

        this.prisma.roomReview.count({
          where: { roomTypeId: query.roomTypeId },
        }),
      ]);
    }

    return {
      items: await Promise.all(
        data.map(async (i) => {
          return plainToClass(
            GetAllRoomReviewItem,
            {
              ...i,
              reviewDate: this.util.formatDate(i.reviewDate),
              customerFullName: i.customer.fullName,
            },
            { excludeExtraneousValues: true },
          );
        }),
      ),
      total,
      averageStar,
    };
  }

  async createRoomRevivew(data: CreateRoomReviewCommand): Promise<string> {
    const isExist = await this.prisma.roomReview.findFirst({
      where: { customerId: data.customerId },
    });

    if (isExist) {
      // return 'This user already reviewed this room!';
      throw new HttpException(
        'This user already reviewed this room!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const id = this.util.generateId();
      await this.prisma.roomReview.create({
        data: {
          ...data,
          id,
        },
      });

      return 'Created successfully';
    }
  }

  async deleteRoomReview(data: DeleteRoomReviewCommand): Promise<string> {
    const item = await this.prisma.roomReview.findUnique({
      where: { id: data.idRoomReview },
    });

    if (item) {
      await this.prisma.roomReview.delete({ where: { id: item.id } });
      return 'Deleted successfully';
    } else {
      throw new HttpException(
        'This review does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
