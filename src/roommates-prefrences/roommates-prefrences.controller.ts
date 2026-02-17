/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RoommatesPrefrencesService } from './roommates-prefrences.service';
import { CreateRoommatesPrefrenceDto } from './dto/create-roommates-prefrence.dto';
import { UpdateRoommatesPrefrenceDto } from './dto/update-roommates-prefrence.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoommatesPrefrences, User } from 'generated/prisma/client';

@Controller('roommates-prefrences')
export class RoommatesPrefrencesController {
  constructor(private readonly roommatesPrefrencesService: RoommatesPrefrencesService) {}

  /**
   * Creates new prefrences for user
   * @param createRoommatesPrefrenceDto 
   * @returns {RoommatesPrefrences}
   */
  @Post("add")
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  create(
    @Body() createRoommatesPrefrenceDto: CreateRoommatesPrefrenceDto,
    @Request() request
  ) {
    const user = request.user as User
    return this.roommatesPrefrencesService.create(createRoommatesPrefrenceDto, user.idUser);
  }

  @Get()
  findAll() {
    return this.roommatesPrefrencesService.findAll();
  }

  @Get('getmatches')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  async getMatches(@Request() request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user = request.user as User;
    //console.log("------------------")
    //console.log(user)
    const matches : User[] =  await this.roommatesPrefrencesService.getMatches(user.idUser);
    return matches;
  }

  /*TODO: get pref by token/users id*/
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roommatesPrefrencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoommatesPrefrenceDto: UpdateRoommatesPrefrenceDto) {
    return this.roommatesPrefrencesService.update(+id, updateRoommatesPrefrenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roommatesPrefrencesService.remove(+id);
  }
}
