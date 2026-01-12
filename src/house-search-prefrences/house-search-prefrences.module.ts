import { Module } from '@nestjs/common';
import { HouseSearchPrefrencesService } from './house-search-prefrences.service';
import { HouseSearchPrefrencesController } from './house-search-prefrences.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [HouseSearchPrefrencesController],
  providers: [HouseSearchPrefrencesService, PrismaService], // Added PrismaService here
})
export class HouseSearchPrefrencesModule {}
