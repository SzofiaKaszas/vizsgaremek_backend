import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HouseSearchPrefrencesService } from './house-search-prefrences.service';
import { CreateHouseSearchPrefrenceDto } from './dto/create-house-search-prefrence.dto';
import { UpdateHouseSearchPrefrenceDto } from './dto/update-house-search-prefrence.dto';

@Controller('house-search-prefrences')
export class HouseSearchPrefrencesController {
  constructor(private readonly houseSearchPrefrencesService: HouseSearchPrefrencesService) {}

  @Post("add")
  create(@Body() createHouseSearchPrefrenceDto: CreateHouseSearchPrefrenceDto) {
    return this.houseSearchPrefrencesService.create(createHouseSearchPrefrenceDto);
  }

  @Get()
  findAll() {
    return this.houseSearchPrefrencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseSearchPrefrencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseSearchPrefrenceDto: UpdateHouseSearchPrefrenceDto) {
    return this.houseSearchPrefrencesService.update(+id, updateHouseSearchPrefrenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseSearchPrefrencesService.remove(+id);
  }
}
