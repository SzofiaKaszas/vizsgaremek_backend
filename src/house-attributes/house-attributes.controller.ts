import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HouseAttributesService } from './house-attributes.service';
import { CreateHouseAttributeDto } from './dto/create-house-attribute.dto';
import { UpdateHouseAttributeDto } from './dto/update-house-attribute.dto';

@Controller('house-attributes')
export class HouseAttributesController {
  constructor(private readonly houseAttributesService: HouseAttributesService) {}

  @Post()
  create(@Body() createHouseAttributeDto: CreateHouseAttributeDto) {
    return this.houseAttributesService.create(createHouseAttributeDto);
  }

  @Get()
  findAll() {
    return this.houseAttributesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseAttributesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseAttributeDto: UpdateHouseAttributeDto) {
    return this.houseAttributesService.update(+id, updateHouseAttributeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseAttributesService.remove(+id);
  }
}
