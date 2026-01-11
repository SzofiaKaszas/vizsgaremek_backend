import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AppService } from 'src/app.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AppService], // Add AppService here
})
export class UserModule {}
