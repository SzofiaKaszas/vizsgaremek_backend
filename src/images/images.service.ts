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
}
