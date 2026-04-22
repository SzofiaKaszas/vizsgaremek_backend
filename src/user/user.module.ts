import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { ImagesService } from 'src/images/images.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, ImagesService], // Add PrismaService here
})
export class UserModule {}
