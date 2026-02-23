/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { HouseListingService } from './house-listing.service';
import { CreateHouseListingDto } from './dto/create-house-listing.dto';
import { UpdateHouseListingDto } from './dto/update-house-listing.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {isAuthorized} from "../helperFunctions/helpers"
import { User } from 'generated/prisma/client';

@Controller('house-listing')
export class HouseListingController {
  constructor(private readonly houseListingService: HouseListingService) {}

  @Post()
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
  }

  @Get()
  findAll() {
    return this.houseListingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseListingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseListingDto: UpdateHouseListingDto) {
    return this.houseListingService.update(+id, updateHouseListingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseListingService.remove(+id);
  }
}
