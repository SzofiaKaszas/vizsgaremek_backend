/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { RoommatesPrefrencesService } from './roommates-prefrences.service';
import { CreateRoommatesPrefrenceDto } from './dto/create-roommates-prefrence.dto';
import { UpdateRoommatesPrefrenceDto } from './dto/update-roommates-prefrence.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiUnauthorizedResponse} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import{RoommatesPrefrencesBaseDto} from './responsDto/response'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RoommatesPrefrences, User } from 'generated/prisma/client';

@Controller('roommates-prefrences')
export class RoommatesPrefrencesController {
  constructor(private readonly roommatesPrefrencesService: RoommatesPrefrencesService) {}

  /**
   * Creates new preferences for user and connects it to the user by userId
   * @param createRoommatesPrefrenceDto Data for creating the preferences
   * @returns Newly created preference record
   * @throws {ConflictException} User already has preferences
   * @throws {BadRequestException} Bad request
   * @throws {UnauthorizedException} User not authenticated
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Post("add")
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiCreatedResponse({
    description: 'Returns the newly created preference record',
    type: RoommatesPrefrencesBaseDto,
  })
  @ApiConflictResponse({
    description: 'User already has preferences',
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  create(
    @Body() createRoommatesPrefrenceDto: CreateRoommatesPrefrenceDto,
    @Request() request
  ) {
    const user = request.user as User
    return this.roommatesPrefrencesService.create(createRoommatesPrefrenceDto, user.idUser);
  }
  /**
   * Returns all preference records
   * @returns Array of all preference records with all data
   * @throws {BadRequestException} Bad request
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Get()
  @ApiOkResponse({
    description: 'Returns an array of all preference records with all data',
    type: [RoommatesPrefrencesBaseDto],
    isArray: true,
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Database operation failed',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  findAll() {
    return this.roommatesPrefrencesService.findAll();
  }
  /**
   * Returns roommate matches based on the current user's preferences
   * Sorted by how well they match with the user
   * @returns Array of matching users sorted by match quality
   * @throws {UnauthorizedException} User not authenticated  
   * @throws {ForbiddenException} Invalid token
   * @throws {BadRequestException} Bad request
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Get('getmatches')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOkResponse({
    description: 'Returns an array of users that are sorted by how good they match with the user with the given id, the array can be empty if there are no other users or if the user with the given id has no preferences',
    type: [RoommatesPrefrencesBaseDto],
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })  
  @ApiForbiddenResponse({
    description: 'Invalid token',
  })
  @ApiUnauthorizedResponse({
    description: 'No authorization',
  })
  async getMatches(@Request() request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user = request.user as User;
    
    return await this.roommatesPrefrencesService.getMatches(user.idUser);
  }
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'The id of the preference record to retrieve',
    example: 1,
    type: Number,
  })  
  @ApiOkResponse({
    description: 'Returns the preference record with the given id',
    type: RoommatesPrefrencesBaseDto,   
  })
  @ApiNotFoundResponse({
    description: 'No preference record found with id',
  
  })
  @ApiBadRequestResponse({
    description: 'Bad request (id is int)',
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed',
  })
  
  /**
   * Finds a specific preference record by ID
   * @param id Preference record ID
   * @returns Preference record with the given ID
   * @throws {BadRequestException} Bad request (id must be int)
   * @throws {NotFoundException} Preference record not found with ID
   * @throws {InternalServerErrorException} Database operation failed
   */
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.roommatesPrefrencesService.findOne(id);
  }
  /**
   * Updates a preference record by ID
   * @param id Preference record ID
   * @body updateRoommatesPrefrenceDto Updated preference data
   * @returns Updated preference record
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} Preference record not found
   * @throws {ForbiddenException} Invalid token
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiParam({
    name: 'id',
    description: 'The id of the preference record to update',
    example: 1,
    type: Number,
  })
  @ApiBody({
    type: UpdateRoommatesPrefrenceDto,
  })
  @ApiOkResponse({
    description: 'Returns the updated preference record',
    type: RoommatesPrefrencesBaseDto,
  })
  @ApiNotFoundResponse({
    description: 'No preference record found with id',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed',
  })
  @ApiForbiddenResponse({
    description: 'Invalid token'
  })
  update(@Param('id') id: string, @Body() updateRoommatesPrefrenceDto: UpdateRoommatesPrefrenceDto) {
    return this.roommatesPrefrencesService.update(+id, updateRoommatesPrefrenceDto);
  }
  /**
   * Deletes a preference record by ID
   * @param id Preference record ID
   * @returns Deleted preference record
   * @throws {BadRequestException} Bad request (id must be int)
   * @throws {NotFoundException} Preference record not found
   * @throws {ForbiddenException} Invalid token
   * @throws {UnauthorizedException} Not authorized to delete this record
   * @throws {InternalServerErrorException} Database operation failed
   */
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    description: 'The id of the preference record to delete',
  })
  @ApiOkResponse({
    description: 'Returns the deleted preference record',
    type: RoommatesPrefrencesBaseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request (id is int)',
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed',
  })
  @ApiForbiddenResponse({
    description: 'Invalid token'
  })
  @ApiUnauthorizedResponse({
    description: 'Not authorized for deleting this record',
  })
  remove(@Param('id') id: string) {
    return this.roommatesPrefrencesService.remove(+id);
  }
}
