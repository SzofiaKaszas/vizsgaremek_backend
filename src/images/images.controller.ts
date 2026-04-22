import { BadRequestException,UseInterceptors, UploadedFile,Controller, Get, Post, Body, Patch, Param,ParseIntPipe, Delete, Request, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'generated/prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { isAuthorized } from 'src/helperFunctions/helpers';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post("upload")
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @UseInterceptors(FileInterceptor("file", { limits: { fileSize: 2 * 1024 * 1024 } }))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() request
  ) {
    const user = request.user as User
    if(!file){
      throw new BadRequestException("No file uploaded")
    }
    if(!file.mimetype.startsWith("image/")){
      throw new BadRequestException("Only pictures are allowed")
    }
    return this.imagesService.upload(file,user.idUser);
  }
  
  @Get("image-count/:id")
  getImageCount(
    @Param("id", ParseIntPipe) id:number
  ){
    return this.imagesService.getImageCount(id)
  }

  @Get("images/:id")
  getImages(
    @Param("id", ParseIntPipe) id:number
  ){
    return this.imagesService.getImages(id)
  }


  @Post("profile/:imageId")
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  setProfile(
    @Param("imageId",ParseIntPipe) imageId:number,
    @Request() request  
  ){
    const user = request.user as User
    return this.imagesService.setProfile(user.idUser,imageId)
  }

  @Delete(":imageId")
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  deletImag(
    @Param("imageId",ParseIntPipe) imageId:number,
    @Request() request
  ){
    const user = request.user as User
    return this.imagesService.deletImag(imageId,user)
  }
}
