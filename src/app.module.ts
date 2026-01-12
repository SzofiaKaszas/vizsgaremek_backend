import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UserLoginModule } from './user-login/user-login.module';
import { UserTokenModule } from './user-token/user-token.module';
import { PrismaService } from './prisma.service';
import { UserAttributesModule } from './user-attributes/user-attributes.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), UserModule, UserLoginModule, UserTokenModule, UserAttributesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService], // Added PrismaService here
})
export class AppModule {}
