/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException, UnprocessableEntityException, ParseIntPipe } from '@nestjs/common';
import { HouseSearchPrefrencesService } from './house-search-prefrences.service';
import { CreateHouseSearchPrefrenceDto } from './dto/create-house-search-prefrence.dto';
import { UpdateHouseSearchPrefrenceDto } from './dto/update-house-search-prefrence.dto';
import {isAuthorized} from '../helperFunctions/helpers'
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'generated/prisma/client';

@Controller('house-search-prefrences')
export class HouseSearchPrefrencesController {
  constructor(private readonly houseSearchPrefrencesService: HouseSearchPrefrencesService) {}

  @Post("add")
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  create(
    @Body() createHouseSearchPrefrenceDto: CreateHouseSearchPrefrenceDto,
    @Request() request
  ) {
    const user = request.user as User
    if(isAuthorized(user,createHouseSearchPrefrenceDto.houseSearchIdUser)){
      return this.houseSearchPrefrencesService.create(createHouseSearchPrefrenceDto);
    }
    else{ throw new UnauthorizedException('Unauthorized to create new HouseSearchPrefrence on this id')}
  }

  @Get()
  findAll() {
    return this.houseSearchPrefrencesService.findAll();
  }

  @Get('gethousematches')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  getHouseMatches(
    @Request() request
  ){
    const user = request.user as User
    return this.houseSearchPrefrencesService.getHouseMatches(user.idUser)
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.houseSearchPrefrencesService.findOne(id);
  }

  @Patch('update')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  update(
    @Body() updateHouseSearchPrefrenceDto: UpdateHouseSearchPrefrenceDto,
    @Request() request
  ) {
    const user = request.user as User
    if(!updateHouseSearchPrefrenceDto.houseSearchIdUser){throw new UnprocessableEntityException('houseSearchIdUser is missing from request body')}
    if(!parseInt(""+updateHouseSearchPrefrenceDto.houseSearchIdUser)){throw new UnprocessableEntityException('houseSearchIdUser must be a valid int')}
    if(isAuthorized(user,updateHouseSearchPrefrenceDto.houseSearchIdUser)){
      return this.houseSearchPrefrencesService.update(updateHouseSearchPrefrenceDto.houseSearchIdUser,updateHouseSearchPrefrenceDto);
    }
    else{ throw new UnauthorizedException('Unauthorized to update HouseSearchPrefrence on this id')}
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() request
  ) {
    const user = request.user as User
    if(isAuthorized(user,id)){
      return this.houseSearchPrefrencesService.remove(id);

    }
    else{ throw new UnauthorizedException('Unauthorized to delete HouseSearchPrefrence on this id')}
  }
}
