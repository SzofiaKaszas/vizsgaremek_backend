/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ForbiddenException,
  ParseIntPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'generated/prisma/client';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';
import {UserBaseDto,UserNecessaryDto} from "./responsDto/responseUserDto"

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  /**
   * Creates new user
   * @throws {ConflictException} User with same unique data already exists 
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} How?
   * @throws {InternalServerErrorException} Database opperation failed
   * @param createUserDto  
   * @returns Created user data with out password
   */
  @Post('register')
  @ApiBody({
    type : CreateUserDto
  })
  @ApiCreatedResponse({
    description: 'Succesfully created the new user',
    type: UserBaseDto
  })
  @ApiConflictResponse({
    description: 'User with same unique data already exists'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database opperation failed'
  })
  create(@Body() createUserDto: CreateUserDto) {
    
    return this.userService.create(createUserDto);
  }


  /**
   * Get the user's id from token 
   */
  @Get('getid')
  @ApiOkResponse({
    description: 'Returns the id of the user',
    type: Number
  })
  @ApiForbiddenResponse({
    description: 'Invalid token'
  })
  @ApiUnauthorizedResponse({
    description: 'No authorization'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  getUserId(@Request() request) {
    const user = request.user as User;
    return { idUser: user.idUser };
  }

  /**
   * Get the user from token
   */
  @Get('me')
  @ApiOkResponse({
    description: 'Returns the user',
    type: UserBaseDto
  })
  @ApiForbiddenResponse({
    description: 'Invalid token'
  })
  @ApiUnauthorizedResponse({
    description: 'No authorization'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  getCurrentUser(@Request() request) {
    return request.user as User;
  }

  /**
   * Returns necessary data of user on parameter id
   */
  @Get(':id/necessary')
  @ApiParam({
    name: 'id',
    description: 'id of a user',
    type: Number,
    example: 1
  })
  @ApiOkResponse({
    description: 'Returns necessary data of user on id',
    type: UserNecessaryDto
  })
  @ApiNotFoundResponse({
    description: 'No user found with id'
  })
  @ApiBadRequestResponse({
    description: 'Bad request (id is int)'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  getPublicData(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getNecessary(id);
  }

  /**
   * Returns user from parameter id 
   */
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id of a user',
    type: Number,
    example: 1
  })
  @ApiOkResponse({
    description: 'Returns data of user on id',
    type: UserBaseDto
  })
  @ApiNotFoundResponse({
    description: 'No user found with id'
  })
  @ApiBadRequestResponse({
    description: 'Bad request (id is int)'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  /**
   * Returns every user
   */
  @Get()
  @ApiOkResponse({
    description: 'Returns data of user on id',
    type: UserBaseDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  @ApiBadRequestResponse({
    description: 'Bad request'
  })
  findAll() {
    return this.userService.findAll();
  }

  /**
   * Updates user by id + validation 
   */
  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'id of a user',
    type: Number,
    example: 1
  })
  @ApiBody({
    type: UpdateUserDto
  })
  @ApiOkResponse({
    description: 'Returns data of modified user',
    type: UserBaseDto
  })
  @ApiNotFoundResponse({
    description: 'No user found with id'
  })
  @ApiBadRequestResponse({
    description: 'Bad request (id is int)'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  @ApiForbiddenResponse({
    description: 'Invalid token,'
  })
  @ApiUnauthorizedResponse({
    description:'Not authorized for modifying this user'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Request() request,
  ) {
    const user = request.user as User;
    if (user.idUser == id || user.role === 'admin') {
      return this.userService.update(id, updateUserDto);
    } else {
      throw new UnauthorizedException("Cannot modify other users' data");
    }
  }

  /**
   * Deletes user by id + validation 
   */
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id of a user',
    type: Number,
    example: 1
  })
  @ApiOkResponse({
    description: 'Returns data of deleted user',
    type: UserBaseDto
  })
  @ApiNotFoundResponse({
    description: 'No user found with id'
  })
  @ApiBadRequestResponse({
    description: 'Bad request (id is int)'
  })
  @ApiInternalServerErrorResponse({
    description: 'Database operation failed'
  })
  @ApiForbiddenResponse({
    description: 'Invalid token,'
  })
  @ApiUnauthorizedResponse({
    description:'Not authorized for modifying this user'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  remove(
    @Param('id',ParseIntPipe) id: number,
    @Request() request
  ) {
    const user = request.user as User;
    if (user.idUser == id || user.role === 'admin') {
      return this.userService.remove(id);
    }else {
      throw new UnauthorizedException("Unauthorized to delete other user");
    }
  }
}
