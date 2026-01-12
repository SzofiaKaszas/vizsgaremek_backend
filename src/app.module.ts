import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UserLoginModule } from './user-login/user-login.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), UserModule, UserLoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
