import { BadRequestException,UseInterceptors, UploadedFile,Controller, Get, Post, Body, Patch, Param,ParseIntPipe, Delete } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file", { limits: { fileSize: 2 * 1024 * 1024 } }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const userIdImages=1
    if(!file){
      throw new BadRequestException("No file uploaded")
    }
    if(!file.mimetype.startsWith("image/")){
      throw new BadRequestException("Only pictures are allowed")
    }
    return this.imagesService.upload(file,userIdImages);
  }

  @Get("images")
  getImages(){
    const userIdImages=1
    return this.imagesService.getImages(userIdImages)
  }

  @Get("image-count")
  getImageCount(){
    const userIdImages=1
    return this.imagesService.getImageCount(userIdImages)
  }

  @Post("profile/:id")
  setProfile(@Param("id",ParseIntPipe) id:number){
    const userIdImages=1
    return this.imagesService.setProfile(userIdImages,id)
  }

  @Delete(":id")
  deletImag(@Param("id",ParseIntPipe) id:number){
    const userIdImages=1
    return this.imagesService.deletImag(id,userIdImages)
  }
}
