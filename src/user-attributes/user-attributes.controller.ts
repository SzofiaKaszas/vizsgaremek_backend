import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAttributesService } from './user-attributes.service';
import { CreateUserAttributeDto } from './dto/create-user-attribute.dto';
import { UpdateUserAttributeDto } from './dto/update-user-attribute.dto';

@Controller('user-attributes')
export class UserAttributesController {
  constructor(private readonly userAttributesService: UserAttributesService) {}

  @Post()
  create(@Body() createUserAttributeDto: CreateUserAttributeDto) {
    return this.userAttributesService.create(createUserAttributeDto);
  }

  @Get()
  findAll() {
    return this.userAttributesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAttributesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAttributeDto: UpdateUserAttributeDto) {
    return this.userAttributesService.update(+id, updateUserAttributeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAttributesService.remove(+id);
  }
}
