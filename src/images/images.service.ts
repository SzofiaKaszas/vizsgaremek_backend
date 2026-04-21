import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma.service';
import { s3 } from "src/s3/s3.service";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Express } from "express";
import { Multer } from 'multer';

@Injectable()
export class ImagesService {
  constructor(private readonly db:PrismaService) {}
  private bucket = "test-image";
  //private Max_Imag=5;

  async getImages(userIdImages:number){
    //console.log("teszt get images")
    const images=await this.db.userImages.findMany({
      where:{
        userIdImages,
        deleted: false
      }
      
    })
    const val=images.map(img=>({
      id:img.id,
      IsProfile:img.IsProfile,
      url:`http://localhost:9000/${this.bucket}/${img.key}`

    }))
    //console.log(val)
    return images.map(img=>({
      id:img.id,
      IsProfile:img.IsProfile,
      url:`http://localhost:9000/${this.bucket}/${img.key}`

    }))
  }
  async getImageCount(userIdImages:number){
    const count=await this.db.userImages.count({
      where:{
        userIdImages,
        deleted: false
      }
    })
    return count
  }
  async setProfile(userIdImages:number, id:number){
    await this.db.userImages.updateMany({
      where:{userIdImages},
      data:{IsProfile:false}
    });
    return this.db.userImages.update({
      where: {id:id},
      data:{IsProfile:true},
    })
  }
  async upload(file: Express.Multer.File, userIdImages:number) {
    const Max_Imag=5
   
    const count=await this.db.userImages.count({
      where:{
        userIdImages,
        deleted: false
      }
    })
    if(count>=Max_Imag){
      throw new BadRequestException("Reached maximum image limit")

    }
  const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const key = `${Date.now()}-${safeName}`;
  const url = `http://localhost:9000/${this.bucket}/${key}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    const image=await this.db.userImages.create({
      data:{
        userIdImages,
        key,
        url,
        IsProfile: false,
        
      }
    })

    return {
      message: "Upload successful",
      id:image.id,
      url: url,
    };
  }
  async deletImag(id:number,userIdImages:number){
    
    return await this.db.userImages.update({
      where:{id:id},
      data:{deleted:true}
    })
  }

}
