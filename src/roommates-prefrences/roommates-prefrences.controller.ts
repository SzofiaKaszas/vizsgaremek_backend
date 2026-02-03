import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoommatesPrefrencesService } from './roommates-prefrences.service';
import { CreateRoommatesPrefrenceDto } from './dto/create-roommates-prefrence.dto';
import { UpdateRoommatesPrefrenceDto } from './dto/update-roommates-prefrence.dto';

@Controller('roommates-prefrences')
export class RoommatesPrefrencesController {
  constructor(private readonly roommatesPrefrencesService: RoommatesPrefrencesService) {}

  @Post("add")
  create(@Body() createRoommatesPrefrenceDto: CreateRoommatesPrefrenceDto) {
    return this.roommatesPrefrencesService.create(createRoommatesPrefrenceDto);
  }

  @Get()
  findAll() {
    return this.roommatesPrefrencesService.findAll();
  }

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
