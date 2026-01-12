import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HouseListingService } from './house-listing.service';
import { CreateHouseListingDto } from './dto/create-house-listing.dto';
import { UpdateHouseListingDto } from './dto/update-house-listing.dto';

@Controller('house-listing')
export class HouseListingController {
  constructor(private readonly houseListingService: HouseListingService) {}

  @Post()
  create(@Body() createHouseListingDto: CreateHouseListingDto) {
    return this.houseListingService.create(createHouseListingDto);
  }

  @Get()
  findAll() {
    return this.houseListingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseListingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseListingDto: UpdateHouseListingDto) {
    return this.houseListingService.update(+id, updateHouseListingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseListingService.remove(+id);
  }
}
