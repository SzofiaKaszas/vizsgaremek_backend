import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UserLoginModule } from './user-login/user-login.module';
import { UserTokenModule } from './user-token/user-token.module';
import { PrismaService } from './prisma.service';
import { UserAttributesModule } from './user-attributes/user-attributes.module';
import { RoommatesPrefrencesModule } from './roommates-prefrences/roommates-prefrences.module';
import { HouseListingModule } from './house-listing/house-listing.module';
import { HouseSearchPrefrencesModule } from './house-search-prefrences/house-search-prefrences.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), UserModule, UserLoginModule, UserTokenModule, UserAttributesModule, RoommatesPrefrencesModule, HouseListingModule, HouseSearchPrefrencesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService], // Added PrismaService here
})
export class AppModule {}
