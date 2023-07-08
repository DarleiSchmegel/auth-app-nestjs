import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User, Prisma } from '@prisma/client';
// import { FindUserWhereInput } from './dto/find-all-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(data: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({ where:data });
  }

  create(data: CreateUserInput) {
    return this.prisma.user.create({data})
  }
}
