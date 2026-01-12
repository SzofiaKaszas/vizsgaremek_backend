import { Module } from '@nestjs/common';
import { RoommatesPrefrencesService } from './roommates-prefrences.service';
import { RoommatesPrefrencesController } from './roommates-prefrences.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RoommatesPrefrencesController],
  providers: [RoommatesPrefrencesService, PrismaService], // Added PrismaService here
})
export class RoommatesPrefrencesModule {}
