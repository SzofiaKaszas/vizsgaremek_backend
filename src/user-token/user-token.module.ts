import { Module } from '@nestjs/common';
import { UserTokenService } from './user-token.service';
import { UserTokenController } from './user-token.controller';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { TokenStrategy } from './token.strategy';

@Module({
  controllers: [UserTokenController],
  providers: [UserTokenService, PrismaService, UserService, TokenStrategy], // Added PrismaService, UserService, TokenStrategy here
})
export class UserTokenModule {}
