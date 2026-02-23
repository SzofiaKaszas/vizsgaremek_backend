/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { HouseListingService } from './house-listing.service';
import { CreateHouseListingDto } from './dto/create-house-listing.dto';
import { UpdateHouseListingDto } from './dto/update-house-listing.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {isAuthorized} from "../helperFunctions/helpers"
import { User } from 'generated/prisma/client';

@Controller('house-listing')
export class HouseListingController {
  constructor(private readonly houseListingService: HouseListingService) {}

  @Post()
  @ApiBody({
    type : CreateHouseListingDto
  })
  @ApiCreatedResponse({
    description: "Succefully created the new house listing",
    //TODO: add return type
  })
  @ApiConflictResponse({
    description: 'House listing with same unique data already exists'
  })
  @ApiBadRequestResponse({
    description: "Bad request"
  })
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  create(
    @Body() createHouseListingDto: CreateHouseListingDto,
    @Request() request
  ) {
    const user = request.user as User
    if(isAuthorized(user, createHouseListingDto.houseIdUser)){
      return this.houseListingService.create(createHouseListingDto);
    }
    else{
      throw new UnauthorizedException('Acces not authorized')
    }
  }

  @Get()
  findAll() {
    return this.houseListingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.houseListingService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateHouseListingDto: UpdateHouseListingDto,
    @Request() request
  ) {
    const user = request.user as User
    if(!updateHouseListingDto.houseIdUser){
      throw new BadRequestException('Request body must contain houseIdUser')
    }
    if(id != updateHouseListingDto.houseIdUser){
      throw new BadRequestException('Request body houseIdUser must not be different from updateHouseListingDto')
    }
    if(isAuthorized(user, updateHouseListingDto.houseIdUser)){
      return this.houseListingService.update(id, updateHouseListingDto);
    }
    else{
      throw new UnauthorizedException('Acces not authorized')
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() request
  ) {
    const user = request.user as User
    if(isAuthorized(user, id)){
      return this.houseListingService.remove(id);
    }
    else{
      throw new UnauthorizedException('Acces not authorized')
    }
  }
}
