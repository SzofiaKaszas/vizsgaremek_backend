import { Module } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { UserLoginController } from './user-login.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserLoginController],
  providers: [UserLoginService, PrismaService], // Added PrismaService to providers
})
export class UserLoginModule {}
