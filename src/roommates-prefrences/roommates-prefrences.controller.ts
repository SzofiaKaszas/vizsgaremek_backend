/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RoommatesPrefrencesService } from './roommates-prefrences.service';
import { CreateRoommatesPrefrenceDto } from './dto/create-roommates-prefrence.dto';
import { UpdateRoommatesPrefrenceDto } from './dto/update-roommates-prefrence.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiUnauthorizedResponse} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import{RoommatesPrefrencesBaseDto} from './responsDto/response'
import { RoommatesPrefrences, User } from 'generated/prisma/client';

@Controller('roommates-prefrences')
export class RoommatesPrefrencesController {
  constructor(private readonly roommatesPrefrencesService: RoommatesPrefrencesService) {}

  /**
   * Creates new prefrences for user and connects it to the user by userId
   * @param createRoommatesPrefrenceDto  Data for creating the prefrences
   * @param userId  User's id to connect the prefrences to
   * @returns {RoommatesPrefrences}
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} User not found
   * @throws {InternalServerErrorException} Database opperation failed
   */
  @Post("add")
  @ApiBearerAuth()
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
    description:'Unauthorized',
  })
  @UseGuards(AuthGuard('bearer'))
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(AuthGuard('bearer'))
  create(
    @Body() createRoommatesPrefrenceDto: CreateRoommatesPrefrenceDto,
    @Request() request
  ) {
    const user = request.user as User
    return this.roommatesPrefrencesService.create(createRoommatesPrefrenceDto, user.idUser);
  }
  /**
   * all preference data
   * @returns  returns an array of all preferenc records with all data
   * @throws {InternalServerErrorException} Database opperation failed
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} Record not found
   */
  @Get()
  @ApiOkResponse({
    description: 'Returns an array of all preferenc records with all data',
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
   *  Finds a specific preference record by id
   * @param id idRoommatesPrefrences
   * @returns  returns a specific preference record by id
   * @param request  Request object containing the user's token for authentication
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} Record not found 
   * @throws {InternalServerErrorException} Database opperation failed
   * 
   * 
   */
  @Get('getmatches')
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOkResponse({
    description: 'Returns an array of users that are sorted by how good they match with the user with the given id, the array can be empty if there are no other users or if the user with the given id has no prefrences',
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
    //console.log("------------------")
    //console.log(user)
    const matches : User[] =  await this.roommatesPrefrencesService.getMatches(user.idUser);
    return matches;
  }

  //TODO: get pref by token/users id*/
  /**
   *Finds a specific preference record by id
   * @param id idRoommatesPrefrences
   * @returns  returns a specific preference record by id
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} Record not found
   * @throws {InternalServerErrorException} Database opperation failed
   */
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
    description: 'Database opperation failed',
  })
  @ApiOkResponse({
    description: 'Returns the preference record with the given id',
    type: RoommatesPrefrencesBaseDto,
  })
  findOne(@Param('id') id: string) {
    return this.roommatesPrefrencesService.findOne(+id);
  }
  /**
   * Updates a preference record by id
   * @param id idRoommatesPrefrences
   * @param updateRoommatesPrefrenceDto 
   * @returns  Updated preference record
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} Record not found
   * @throws {InternalServerErrorException} Database opperation failed
   */
  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'The id of the preference record to update',
    example: 1,
    type: Number,
  })
  @ApiBody({
    type: UpdateRoommatesPrefrenceDto,
  })
  
  /*@ApiiOkResponse({
    description: 'Returns the updated preference record',
    type: RoommatesPrefrencesBaseDto,
  })*/
  @ApiNotFoundResponse({
    description: 'No preference record found with id',
  })
 
  
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Database opperation failed',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiForbiddenResponse({
      description: 'Invalid token,'
    })
    
  update(@Param('id') id: string, @Body() updateRoommatesPrefrenceDto: UpdateRoommatesPrefrenceDto) {
    return this.roommatesPrefrencesService.update(+id, updateRoommatesPrefrenceDto);
  }
  /**
   * Deletes a preference record by id
   * @param id idRoommatesPrefrences
   * @returns  the deleted record
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} Record not found
   * @throws {InternalServerErrorException} Database opperation failed
   */
  @Delete(':id')
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
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Database opperation failed',
  })  
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  
  @ApiForbiddenResponse({
      description: 'Invalid token,'
    })
  @ApiUnauthorizedResponse({
      description:'Not authorized for deleting this record',
    })
    @ApiBadRequestResponse({
      description: 'Bad request (id is int)',
    })
    
  
    
  remove(@Param('id') id: string) {
    return this.roommatesPrefrencesService.remove(+id);
  }
}
