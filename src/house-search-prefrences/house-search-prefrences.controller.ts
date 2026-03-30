/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException, UnprocessableEntityException, ParseIntPipe } from '@nestjs/common';
import { HouseSearchPrefrencesService } from './house-search-prefrences.service';
import { CreateHouseSearchPrefrenceDto } from './dto/create-house-search-prefrence.dto';
import { UpdateHouseSearchPrefrenceDto } from './dto/update-house-search-prefrence.dto';
import {isAuthorized} from '../helperFunctions/helpers'
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from 'generated/prisma/client';

@Controller('house-search-prefrences')
export class HouseSearchPrefrencesController {
  constructor(private readonly houseSearchPrefrencesService: HouseSearchPrefrencesService) {}

  /**
   * Creates new house search preferences for a user
   * @param createHouseSearchPrefrenceDto Data for creating the preferences
   * @param request Request object containing user authentication
   * @returns Created house search preference record
   * @throws {BadRequestException} Bad request
   * @throws {UnauthorizedException} User not authorized to create preferences on this user id
   * @throws {NotFoundException} User not found
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Post("add")
  @ApiBody({
    type: CreateHouseSearchPrefrenceDto
  })
  @ApiCreatedResponse({
    description: 'House search preferences successfully created'
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized to create preferences on this user id'
  })
  @ApiBadRequestResponse({
    description: 'Bad request'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
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

  /**
   * Returns all house search preference records
   * @returns Array of all house search preference records
   * @throws {BadRequestException} Bad request
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Get()
  @ApiOkResponse({
    description: 'Returns all house search preference records'
  })
  @ApiBadRequestResponse({
    description: 'Bad request'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  findAll() {
    return this.houseSearchPrefrencesService.findAll();
  }

  /**
   * Returns house matches based on the current user's preferences
   * @param request Request object containing user authentication
   * @returns Array of matching house listings sorted by relevance
   * @throws {UnauthorizedException} User not authenticated
   * @throws {BadRequestException} Bad request
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Get('gethousematches')
  @ApiOkResponse({
    description: 'Returns house matches based on user preferences'
  })
  @ApiUnauthorizedResponse({
    description: 'User not authenticated'
  })
  @ApiBadRequestResponse({
    description: 'Bad request'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  getHouseMatches(
    @Request() request
  ){
    const user = request.user as User
    return this.houseSearchPrefrencesService.getHouseMatches(user.idUser)
  }


  /**
   * Returns a specific house search preference record by ID
   * @param id House search preference record ID
   * @returns House search preference data
   * @throws {BadRequestException} Bad request (id must be int)
   * @throws {NotFoundException} Preference record not found
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'House search preference record ID',
    type: Number,
    example: 1
  })
  @ApiOkResponse({
    description: 'Returns the house search preference data'
  })
  @ApiNotFoundResponse({
    description: 'Preference record not found'
  })
  @ApiBadRequestResponse({
    description: 'Bad request (id must be int)'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.houseSearchPrefrencesService.findOne(id);
  }

  /**
   * Updates a house search preference record
   * @param updateHouseSearchPrefrenceDto Updated preference data (must include houseSearchIdUser)
   * @param request Request object containing user authentication
   * @returns Updated house search preference record
   * @throws {UnprocessableEntityException} Missing or invalid houseSearchIdUser
   * @throws {UnauthorizedException} User not authorized to update this preference
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} Preference record not found
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Patch('update')
  @ApiBody({
    type: UpdateHouseSearchPrefrenceDto
  })
  @ApiOkResponse({
    description: 'House search preference successfully updated'
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized to update this preference'
  })
  @ApiBadRequestResponse({
    description: 'Bad request'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
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

  /**
   * Deletes a house search preference record by ID
   * @param id House search preference record ID
   * @param request Request object containing user authentication
   * @returns Deleted house search preference record
   * @throws {BadRequestException} Bad request (id must be int)
   * @throws {UnauthorizedException} User not authorized to delete this preference
   * @throws {NotFoundException} Preference record not found
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'House search preference record ID',
    type: Number,
    example: 1
  })
  @ApiOkResponse({
    description: 'House search preference successfully deleted'
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized to delete this preference'
  })
  @ApiNotFoundResponse({
    description: 'Preference record not found'
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
    if(isAuthorized(user,id)){
      return this.houseSearchPrefrencesService.remove(id);

    }
    else{ throw new UnauthorizedException('Unauthorized to delete HouseSearchPrefrence on this id')}
  }
}
