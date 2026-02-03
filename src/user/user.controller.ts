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
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'generated/prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //create a new user
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('getid')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  getUserId(@Request() request) {
    const user = request.user as User;
    return { idUser: user.idUser };
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  getCurrentUser(@Request() request) {
    return request.user as User;
  }

  //get one user by id with necessary data
  @Get(':id/necessary')
  getPublicData(@Param('id') id: string) {
    return this.userService.getNecessary(+id);
  }

  //get one user by id and all data
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  //get all users and all data
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  //update user by id
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() request,
  ) {
    const user = request.user as User;
    if (user.idUser == +id || user.role === 'admin') {
      return this.userService.update(+id, updateUserDto);
    } else {
      throw new ForbiddenException("Cannot modify other users' data");
    }
  }

  //delete user by id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
