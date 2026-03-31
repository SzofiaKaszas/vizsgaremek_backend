/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Post, Body, Param, UseGuards, Request, UnauthorizedException, ParseIntPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'generated/prisma/client';
import {isAdmin} from '../helperFunctions/helpers'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @Post()
  create(
    @Body() createAdminDto: CreateAdminDto,
    @Request() request
  ) {
    const user = request.user as User
    if(!isAdmin(user)){throw new UnauthorizedException}
    return this.adminService.create(createAdminDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @Get('adminList')
  getAllAdmins(
    @Request() request
  ){
    const user = request.user as User
    if(!isAdmin(user)){throw new UnauthorizedException}
    return this.adminService.adminList();
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @Get('roommateRatingList')
  getAllUnaprovedRoommateRatings(
    @Request() request
  ){
    const user = request.user as User
    if(!isAdmin(user)){throw new UnauthorizedException}
    return this.adminService.allUnaprovedRoommateRatings();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @Get('houseRatingList')
  getAllUnaprovedHouseRatings(
    @Request() request
  ){
    const user = request.user as User
    if(!isAdmin(user)){throw new UnauthorizedException}
    return this.adminService.allUnaprovedHouseRatings();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @Post('aproveRoommateRating/:id')
  approveRoommateRating(
    @Param('id', ParseIntPipe) ratingId : number,
    @Request() request
  ) {
    const user = request.user as User
    if(!isAdmin(user)){throw new UnauthorizedException}
    return this.adminService.aproveRoommateRating(ratingId);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @Post('aproveHouseRating/:id')
  approveHouseRating(
    @Param('id', ParseIntPipe) ratingId : number,
    @Request() request
  ) {
    const user = request.user as User
    if(!isAdmin(user)){throw new UnauthorizedException}
    return this.adminService.aproveHouseRating(ratingId);
  }





  
}
