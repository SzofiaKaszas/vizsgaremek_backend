import { Module } from '@nestjs/common';
import { HouseListingService } from './house-listing.service';
import { HouseListingController } from './house-listing.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [HouseListingController],
  providers: [HouseListingService, PrismaService], // Added PrismaService here
})
export class HouseListingModule {}
