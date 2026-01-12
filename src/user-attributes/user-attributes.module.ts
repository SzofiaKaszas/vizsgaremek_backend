import { Module } from '@nestjs/common';
import { UserAttributesService } from './user-attributes.service';
import { UserAttributesController } from './user-attributes.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserAttributesController],
  providers: [UserAttributesService, PrismaService], // Added PrismaService here
})
export class UserAttributesModule {}
