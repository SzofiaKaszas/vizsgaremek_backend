import { Module } from '@nestjs/common';
import { HouseAttributesService } from './house-attributes.service';
import { HouseAttributesController } from './house-attributes.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [HouseAttributesController],
  providers: [HouseAttributesService, PrismaService], // Added PrismaService here
})
export class HouseAttributesModule {}
