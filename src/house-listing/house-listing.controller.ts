/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException, ParseIntPipe, BadRequestException, Res, InternalServerErrorException } from '@nestjs/common';
import { HouseListingService } from './house-listing.service';
import { CreateHouseListingDto } from './dto/create-house-listing.dto';
import { UpdateHouseListingDto } from './dto/update-house-listing.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { isAuthorized } from "../helperFunctions/helpers"
import { User } from 'generated/prisma/client';
import { CreateRatingDto, UpdateRatingDto } from 'src/user/dto/create-rating.dto';
import type { Response } from 'express';

@Controller('house-listing')
export class HouseListingController {
  constructor(private readonly houseListingService: HouseListingService) { }

  /**
   * Creates a new house listing
   * @param createHouseListingDto Data for creating the house listing
   * @returns Created house listing
   * @throws {ConflictException} House listing with same unique data already exists
   * @throws {BadRequestException} Bad request
   * @throws {UnauthorizedException} User not authorized to create listing on this user id
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Post()
  @ApiBody({
    type: CreateHouseListingDto
  })
  @ApiCreatedResponse({
    description: "Successfully created the new house listing",
  })
  @ApiConflictResponse({
    description: 'House listing with same unique data already exists'
  })
  @ApiBadRequestResponse({
    description: "Bad request"
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized to create listing on this user id'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  async create(
    @Body() createHouseListingDto: CreateHouseListingDto,
    @Request() request
  ) {
    const user = request.user as User
    if (isAuthorized(user, createHouseListingDto.houseIdUser)) {
      const newHouse = await this.houseListingService.create(createHouseListingDto);

      return newHouse;
    }
    else {
      throw new UnauthorizedException('Acces not authorized')
    }
  }

  /**
   * Returns all house listings liked by the current user
   * @returns Array of liked house listings
   */
  @Get('liked')
  @ApiOkResponse({
    description: 'Returns all house listings liked by the current user',
  })
  @ApiUnauthorizedResponse({
    description: 'User not authenticated'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  getLikes(
    @Request() request,
  ) {
    const user = request.user as User
    return this.houseListingService.getLikes(user.idUser)
  }

  /**
   * Returns all house listings for a specific user
   * @param id User ID
   * @returns Array of all house listings for the user
   * @throws {BadRequestException} Bad request (id must be int)
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Get(":id/all")
  @ApiParam({
    name: 'id',
    description: 'User ID',
    type: Number,
    example: 1
  })
  @ApiOkResponse({
    description: 'Returns all house listings for the specified user',
  })
  @ApiBadRequestResponse({
    description: 'Bad request (id must be int)'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  findAll(@Param("id", ParseIntPipe) id: number) {
    return this.houseListingService.findAll(id);
  }

  /**
   * Returns a specific house listing by ID
   * @param id House listing ID
   * @returns House listing data
   * @throws {BadRequestException} Bad request (id must be int)
   * @throws {NotFoundException} House listing not found
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'House listing ID',
    type: Number,
    example: 1
  })
  @ApiOkResponse({
    description: 'Returns the house listing data',
  })
  @ApiNotFoundResponse({
    description: 'House listing not found'
  })
  @ApiBadRequestResponse({
    description: 'Bad request (id must be int)'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.houseListingService.findOne(id);
  }


  /**
   * Likes a house listing or removes the like if already liked
   * @param id House listing ID
   * @param res Response object to send custom status codes
   * @returns Like action result (created or deleted)
   * @throws {BadRequestException} Bad request (id must be int)
   * @throws {UnauthorizedException} User not authenticated
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Post('like/:id')
  @ApiParam({
    name: 'id',
    description: 'House listing ID',
    type: Number,
    example: 1
  })
  @ApiCreatedResponse({
    description: 'Like successfully created'
  })
  @ApiOkResponse({
    description: 'Like successfully removed'
  })
  @ApiUnauthorizedResponse({
    description: 'User not authenticated'
  })
  @ApiBadRequestResponse({
    description: 'Bad request (id must be int)'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  async like(
    @Param('id', ParseIntPipe) id: number,
    @Request() request,
    @Res() res: Response
  ) {
    const user = request.user as User
    const result = await this.houseListingService.likeHouse(user.idUser, id)
    if (!result) { throw new InternalServerErrorException }
    const data = result.data
    if (result.action == 'created') {
      return res.status(201).send({ data })
    }
    return res.status(200).send({ data })
  }

  /**
   * Creates a rating for a house listing
   * @param id House listing ID
   * @param createRatingDto Rating data
   * @returns Created rating
   * @throws {BadRequestException} Bad request
   * @throws {UnauthorizedException} User not authenticated
   * @throws {NotFoundException} House listing not found
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Post('rate/:id')
  @ApiParam({
    name: 'id',
    description: 'House listing ID',
    type: Number,
    example: 1
  })
  @ApiBody({
    type: CreateRatingDto
  })
  @ApiCreatedResponse({
    description: 'Rating successfully created'
  })
  @ApiUnauthorizedResponse({
    description: 'User not authenticated'
  })
  @ApiNotFoundResponse({
    description: 'House listing not found'
  })
  @ApiBadRequestResponse({
    description: 'Bad request'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  rate(
    @Param('id', ParseIntPipe) id: number,
    @Body() createRatingDto: CreateRatingDto,
    @Request() request
  ) {
    const user = request.user as User
    return this.houseListingService.rateHouse(user.idUser, id, createRatingDto)
  }

  /**
   * Updates a rating for a house listing
   * @param id House listing ID
   * @param updateRatingDto Updated rating data
   * @returns Updated rating
   * @throws {BadRequestException} Bad request
   * @throws {UnauthorizedException} User not authenticated
   * @throws {NotFoundException} Rating or house listing not found
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Patch('rate/:id')
  @ApiParam({
    name: 'id',
    description: 'House listing ID',
    type: Number,
    example: 1
  })
  @ApiBody({
    type: UpdateRatingDto
  })
  @ApiOkResponse({
    description: 'Rating successfully updated'
  })
  @ApiUnauthorizedResponse({
    description: 'User not authenticated'
  })
  @ApiNotFoundResponse({
    description: 'Rating or house listing not found'
  })
  @ApiBadRequestResponse({
    description: 'Bad request'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  updateRating(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRatingDto: UpdateRatingDto,
    @Request() request
  ) {
    const user = request.user as User

    return this.houseListingService.updateratingHouse(user.idUser, id, updateRatingDto)
  }

  /**
   * Updates a house listing by ID
   * @param id House listing ID
   * @para updateHouseListingDto Updated house listing data
   * @returns Updated house listing
   * @throws {BadRequestException} Bad request or missing houseIdUser
   * @throws {UnauthorizedException} User not authorized to update this listing
   * @throws {NotFoundException} House listing not found
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'House listing ID',
    type: Number,
    example: 1
  })
  @ApiBody({
    type: UpdateHouseListingDto
  })
  @ApiOkResponse({
    description: 'House listing successfully updated'
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized to update this listing'
  })
  @ApiNotFoundResponse({
    description: 'House listing not found'
  })
  @ApiBadRequestResponse({
    description: 'Bad request or missing houseIdUser'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHouseListingDto: UpdateHouseListingDto,
    @Request() request
  ) {
    const user = request.user as User
    if (!updateHouseListingDto.houseIdUser) {
      throw new BadRequestException('Request body must contain houseIdUser')
    }
    if (id != updateHouseListingDto.houseIdUser) {
      throw new BadRequestException('Request body houseIdUser must not be different from updateHouseListingDto')
    }
    if (isAuthorized(user, updateHouseListingDto.houseIdUser)) {
      return this.houseListingService.update(id, updateHouseListingDto);
    }
    else {
      throw new UnauthorizedException('Acces not authorized')
    }
  }

  /**
   * Deletes a house listing by ID
   * @param id House listing ID
   * @returns Deleted house listing
   * @throws {BadRequestException} Bad request (id must be int)
   * @throws {UnauthorizedException} User not authorized to delete this listing
   * @throws {NotFoundException} House listing not found
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'House listing ID',
    type: Number,
    example: 1
  })
  @ApiOkResponse({
    description: 'House listing successfully deleted'
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized to delete this listing'
  })
  @ApiNotFoundResponse({
    description: 'House listing not found'
  })
  @ApiBadRequestResponse({
    description: 'Bad request (id must be int)'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() request
  ) {
    const user = request.user as User
    if (isAuthorized(user, id)) {
      return this.houseListingService.remove(id);
    }
    else {
      throw new UnauthorizedException('Acces not authorized')
    }
  }
}
