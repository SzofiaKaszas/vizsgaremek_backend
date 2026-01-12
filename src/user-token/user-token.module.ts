import { Module } from '@nestjs/common';
import { UserTokenService } from './user-token.service';
import { UserTokenController } from './user-token.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserTokenController],
  providers: [UserTokenService, PrismaService], // Added PrismaService here
})
export class UserTokenModule {}
