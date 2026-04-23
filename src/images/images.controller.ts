import { BadRequestException,UseInterceptors, UploadedFile,Controller, Get, Post, Body, Patch, Param,ParseIntPipe, Delete, Request, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'generated/prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { isAuthorized } from 'src/helperFunctions/helpers';
import {type Express } from 'express';
import { hu } from '@faker-js/faker';

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
    console.log("upload endpoint called")
    const user = request.user as User
    if(!file){
      throw new BadRequestException("No file uploaded")
    }
    if(!file.mimetype.startsWith("image/")){
      throw new BadRequestException("Only pictures are allowed")
    }
    return this.imagesService.upload(file,user.idUser);
  }
  @Post("upload-house/:houseId")
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @UseInterceptors(FileInterceptor("file", { limits: { fileSize: 2 * 1024 * 1024 } }))
  uploadHouseImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() request,
    @Param("houseId",ParseIntPipe) houseId:number
  ) {
    console.log("upload endpoint called")

    const user = request.user as User
    if(!file){
      throw new BadRequestException("No file uploaded")
    }
    if(!file.mimetype.startsWith("image/")){
      throw new BadRequestException("Only pictures are allowed")
    }
    return this.imagesService.uploadHouseImage(file, user.idUser, houseId);
  }
    
  
  @Get("image-user-count/:id")
  getImageCount(
    @Param("id", ParseIntPipe) id:number
  ){
    return this.imagesService.getImageCount(id)
  }
  @Get("image-house-count/:id")
  getHouseImageCount(
    @Param("id", ParseIntPipe) id:number
  ){
    return this.imagesService.getHouseImageCount(id)
  }


  @Get("user-images/:id")
  getImages(
    @Param("id", ParseIntPipe) id:number
  ){
    return this.imagesService.getImages(id)
  }
  @Get("house-images/:id")
  getHouseImages(
    @Param("id", ParseIntPipe) id:number
  ){
    return this.imagesService.getHouseImages(id)
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
  @Post("profile-house/:houseId/:imageId")
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  setProfileHouse(
    @Param("imageId",ParseIntPipe) imageId:number,
    @Param("houseId",ParseIntPipe) houseId:number,
    @Request() request  
  ){
    const user = request.user as User
    return this.imagesService.setProfileHouse(user.idUser,houseId,imageId)
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
  @Delete(":houseImageId")
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  deletHouseImage(
    @Param("houseImageId",ParseIntPipe) houseImageId:number,
    @Request() request
  ){
    const user = request.user as User
    return this.imagesService.deletHouseImage(houseImageId,user)
  }
}
