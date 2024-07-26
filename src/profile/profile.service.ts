import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import { GetDetailProfileResult } from './result/get.detail.profile.result';
import { plainToClass } from 'class-transformer';
import { UpdateProfileCommand } from './handler/command/update.profile.command';
import { DeleteProfileCommand } from './handler/command/delete.profile.command';

@Injectable()
export class ProfileService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async getDetailProfile(id: string): Promise<GetDetailProfileResult> {
    const data = await this.prisma.user.findUnique({
      where: { id },
      select: {
        username: true,
        fullName: true,
        phone: true,
        email: true,
      },
    });

    return plainToClass(GetDetailProfileResult, data, {
      excludeExtraneousValues: true,
    });
  }

  async updateProfile(data: UpdateProfileCommand): Promise<string> {
    const { id, ...updateData } = data;

    const item = await this.prisma.user.findUnique({ where: { id } });

    if (item) {
      await this.prisma.user.update({
        where: { id },
        data: updateData,
      });

      return 'Updated successfully';
    } else {
      throw new HttpException('Profile does not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteProfile(data: DeleteProfileCommand): Promise<string> {
    const item = await this.prisma.user.findUnique({ where: { id: data.id } });

    if (item) {
      await this.prisma.user.delete({ where: { id: item.id } });
      return 'Deleted successfully';
    } else {
      throw new HttpException('Profile does not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
