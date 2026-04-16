/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Post, Body, Param, UseGuards, Request, UnauthorizedException, ParseIntPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiUnauthorizedResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { User } from 'generated/prisma/client';
import {isAdmin} from '../helperFunctions/helpers'

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * Creates a new admin user
   * @param createAdminDto Data for creating the admin
   * @param request Request object containing user authentication
   * @returns Created admin data
   * @throws {UnauthorizedException} User not authorized (not admin)
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Post()
  @ApiBody({
    type: CreateAdminDto
  })
  @ApiCreatedResponse({
    description: 'Successfully created the new admin'
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  create(
    @Body() createAdminDto: CreateAdminDto,
    @Request() request
  ) {
    const user = request.user as User
    if(!isAdmin(user)){throw new UnauthorizedException}
    return this.adminService.create(createAdminDto);
  }

  /**
   * Gets all admin users
   * @param request Request object containing user authentication
   * @returns List of all admins
   * @throws {UnauthorizedException} User not authorized (not admin)
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Get('adminList')
  @ApiOkResponse({
    description: 'Successfully retrieved list of admins'
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  getAllAdmins(
    @Request() request
  ){
    const user = request.user as User
    if(!isAdmin(user)){throw new UnauthorizedException}
    return this.adminService.adminList();
  }
  
  /**
   * Gets all unapproved roommate ratings
   * @param request Request object containing user authentication
   * @returns List of unapproved roommate ratings
   * @throws {UnauthorizedException} User not authorized (not admin)
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Get('roommateRatingList')
  @ApiOkResponse({
    description: 'Successfully retrieved list of unapproved roommate ratings'
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  getAllUnaprovedRoommateRatings(
    @Request() request
  ){
    const user = request.user as User
    if(!isAdmin(user)){throw new UnauthorizedException}
    return this.adminService.allUnaprovedRoommateRatings();
  }

  /**
   * Gets all unapproved house ratings
   * @param request Request object containing user authentication
   * @returns List of unapproved house ratings
   * @throws {UnauthorizedException} User not authorized (not admin)
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Get('houseRatingList')
  @ApiOkResponse({
    description: 'Successfully retrieved list of unapproved house ratings'
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  getAllUnaprovedHouseRatings(
    @Request() request
  ){
    const user = request.user as User
    if(!isAdmin(user)){throw new UnauthorizedException}
    return this.adminService.allUnaprovedHouseRatings();
  }

  /**
   * Approves a roommate rating
   * @param ratingId ID of the rating to approve
   * @param request Request object containing user authentication
   * @returns Approved rating data
   * @throws {UnauthorizedException} User not authorized (not admin)
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Post('aproveRoommateRating/:id')
  @ApiParam({
    name: 'id',
    description: 'ID of the roommate rating to approve',
    type: Number
  })
  @ApiOkResponse({
    description: 'Successfully approved the roommate rating'
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  approveRoommateRating(
    @Param('id', ParseIntPipe) ratingId : number,
    @Request() request
  ) {
    const user = request.user as User
    if(!isAdmin(user)){throw new UnauthorizedException}
    return this.adminService.aproveRoommateRating(ratingId);
  }
  /**
   * Approves a house rating
   * @param ratingId ID of the rating to approve
   * @param request Request object containing user authentication
   * @returns Approved rating data
   * @throws {UnauthorizedException} User not authorized (not admin)
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Post('aproveHouseRating/:id')
  @ApiParam({
    name: 'id',
    description: 'ID of the house rating to approve',
    type: Number
  })
  @ApiOkResponse({
    description: 'Successfully approved the house rating'
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  approveHouseRating(
    @Param('id', ParseIntPipe) ratingId : number,
    @Request() request
  ) {
    const user = request.user as User
    if(!isAdmin(user)){throw new UnauthorizedException}
    return this.adminService.aproveHouseRating(ratingId);
  }





  
}
