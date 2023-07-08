import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({

  providers: [UsersResolver, UserService, PrismaService],
  exports: [UserService],
})
export class UsersModule {}
