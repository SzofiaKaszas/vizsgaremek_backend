/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma.service';
import { s3 } from 'src/s3/s3.service';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Express } from 'express';
//import { Multer } from 'multer';
import { User } from 'generated/prisma/client';
import { handlePrismaError, isAuthorized } from 'src/helperFunctions/helpers';
import { hu } from '@faker-js/faker';

@Injectable()
export class ImagesService {
  constructor(private readonly db: PrismaService) {}
  private bucket = 'test-image';
  //private Max_Imag=5;

  async getImages(userId: number) {
    //console.log("teszt get images")
    try {
      const images = await this.db.userImages.findMany({
        where: {
          userIdImages: userId,
          deleted: false,
        },
      });
      return images;
    } catch (error) {
      handlePrismaError(error);
    }
    //console.log(val)
    /*return images.map(img=>({
      id:img.id,
      IsProfile:img.IsProfile,
      url:`http://localhost:9000/${this.bucket}/${img.key}`

    }))*/
  }
  async getImageCount(userId: number) {
    try {
      const count = await this.db.userImages.count({
        where: {
          userIdImages: userId,
          deleted: false,
        },
      });
      return count;
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async setProfile(userId: number, id: number) {
    try {
      await this.db.userImages.updateMany({
        where: { userIdImages: userId },
        data: { IsProfile: false },
      });
      return await this.db.userImages.update({
        where: { id: id },
        data: { IsProfile: true },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async upload(file: Express.Multer.File, userId: number) {
    const Max_Imag = 5;
    try {
      const count = await this.db.userImages.count({
        where: {
          userIdImages: userId,
          deleted: false,
        },
      });
      if (count >= Max_Imag) {
        throw new BadRequestException('Reached maximum image limit');
      }
      const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const key = `${Date.now()}-${safeName}`;
      const url = `http://localhost:9000/${this.bucket}/${key}`;

      console.log("s3 called")
      const resp = await s3.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
      console.log("s3 done")
      
      if(resp){console.log(resp)}

      const image = await this.db.userImages.create({
        data: {
          userIdImages: userId,
          key,
          url,
          IsProfile: false,
        },
      });

      return image;
    } catch (error) {
      handlePrismaError(error);
      throw new InternalServerErrorException("s3 has issues D:")
    }
  }

  async deletImag(id: number, user: User) {
    try {
      const image = await this.db.userImages.findUnique({
        where: { id },
      });
      if (!image) {
        throw new NotFoundException();
      }
      if (!isAuthorized(user, image.userIdImages)) {
        throw new UnauthorizedException();
      }
      return await this.db.userImages.update({
        where: { id: id },
        data: { deleted: true },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async uploadHouseImage(file: Express.Multer.File, userId: number, houseId: number) {
    const Max_Imag = 8;
    try {
      const count = await this.db.houseImages.count({
        where: {
          houseIdImages: houseId,
          deleted: false,
        },
      });
      if (count >= Max_Imag) {
        throw new BadRequestException('Reached maximum image limit');
      }
      const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const key = `${Date.now()}-${safeName}`;
      const url = `http://localhost:9000/${this.bucket}/${key}`;

      console.log("s3 called")
      const resp = await s3.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
      console.log("s3 done")
      
      if(resp){console.log(resp)}

      const image = await this.db.houseImages.create({
        data: {
          houseIdImages: houseId,
          key,
          url,
          IsProfile: false,
        },
      });

      return image;
    } catch (error) {
      handlePrismaError(error);
      throw new InternalServerErrorException("s3 has issues (=^ ◡ ^=) ") 
    }
  }
  async getHouseImageCount(houseId: number) {
    try {
      const count = await this.db.houseImages.count({
        where: {
          houseIdImages: houseId,
          deleted: false,
        },
      });
      return count;
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async getHouseImages(houseId: number) {
    try {
      const images = await this.db.houseImages.findMany({
        where: {
          houseIdImages: houseId,
          deleted: false,
        },
      });
      return images;
    } catch (error) {
      handlePrismaError(error);
    }

  }
  async setProfileHouse(userId: number, houseId: number, imageId: number) {
    try {
      await this.db.houseImages.updateMany({
        where: { houseIdImages: houseId },
        data: { IsProfile: false },
      });
      return await this.db.houseImages.update({
        where: { idHouseImage: imageId},
        data: { IsProfile: true },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async deletHouseImage( houseImageId: number, user: User) {
    try {
      /*const image = await this.db.userImages.findUnique({
        where: { id },
      });*/
      const house = await this.db.houseListing.findUnique({
        where:{idHouse:houseImageId}
      })
      if (!house) {
        throw new NotFoundException();
      }
      if (!isAuthorized(user, house.houseIdUser)) {
        throw new UnauthorizedException();
      }
      const image = await this.db.houseImages.findUnique({
        where: { idHouseImage: houseImageId },
      });
      if (!image) {
        throw new NotFoundException();
      }
     /* if (!isAuthorized(user, image.idHouseImage )) { //image.idHouseImage 
        throw new UnauthorizedException();
      }*/
      return await this.db.houseImages.update({
        where: { idHouseImage: houseImageId },
        data: { deleted: true },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }


}
