import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { SignUpCommand } from './handler/command/sign.up.command';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from './jwt.config';
import { plainToClass } from 'class-transformer';
import { SignInResult } from './result/sign.in.result';
import { UtilityImplement } from 'libs/utility.module';
import { SignInCommand } from './handler/command/sign.in.command';

@Injectable()
export class AuthService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly jwtService: JwtService;
  @Inject()
  private readonly util: UtilityImplement;

  async signUp(command: SignUpCommand) {
    const users = await this.prisma.user.findMany({
      select: { username: true, email: true },
    });
    const emails = users.map((user) => user.email);
    const usernames = users.map((user) => user.username);
    const checkEmail = emails.includes(command.email);
    const checkUsername = usernames.includes(command.username);
    if (checkEmail === true) {
      throw new HttpException('Email exists', HttpStatus.BAD_REQUEST);
    }
    if (checkUsername === true) {
      throw new HttpException('Username exists', HttpStatus.BAD_REQUEST);
    }
    if (command.password !== command.confirmPassword) {
      throw new HttpException('Comfirm password wrong', HttpStatus.BAD_REQUEST);
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(command.password, salt);
    const id = this.util.generateId();
    await this.prisma.user.create({
      data: {
        id,
        fullName: command.fullName,
        email: command.email,
        phone: command.phone,
        username: command.username,
        password: hashPassword,
      },
    });
    return 'Register successfully';
  }

  async signIn(command: SignInCommand) {
    let employee = false;
    let user = await this.prisma.user.findUnique({
      where: { username: command.username },
    });
    if (!user) {
      employee = true;
      user = await this.prisma.employee.findUnique({
        where: { username: command.username },
      });
      if (!user) {
        throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
      }
    }
    const check = await bcrypt.compare(command.password, user.password);
    if (check === false) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
    const token = await this.jwtService.signAsync(
      { id: user.id, username: user.username },
      { secret: jwtConfig.access, expiresIn: jwtConfig.expiresIn.access },
    );
    if (employee) {
      await this.prisma.employee.update({
        data: { token },
        where: { id: user.id },
      });
    } else {
      await this.prisma.user.update({
        data: { token },
        where: { id: user.id },
      });
    }
    return plainToClass(
      SignInResult,
      { token, username: user.fullName },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
