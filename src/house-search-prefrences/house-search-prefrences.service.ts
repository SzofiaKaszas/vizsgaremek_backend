import { Injectable } from '@nestjs/common';
import { CreateHouseSearchPrefrenceDto } from './dto/create-house-search-prefrence.dto';
import { UpdateHouseSearchPrefrenceDto } from './dto/update-house-search-prefrence.dto';
import { PrismaService } from 'src/prisma.service';
import { handlePrismaError } from 'src/helperFunctions/helpers';

@Injectable()
export class HouseSearchPrefrencesService {
  constructor(private readonly db : PrismaService) {}
  create(createHouseSearchPrefrenceDto: CreateHouseSearchPrefrenceDto) {
    return this.db.houseSearchPrefrences.create({
      data: createHouseSearchPrefrenceDto,
    });
  }

  async findAll() {
    try{
      return await this.db.houseSearchPrefrences.findMany();
    }catch(error){
      handlePrismaError(error)
    }
  }

  async findOne(id: number) {
    try{
      return await this.db.houseSearchPrefrences.findUnique({
        where: { houseSearchIdUser: id },
      });
    }catch(error){
      handlePrismaError(error)
    }
  }

  async update(id: number, updateHouseSearchPrefrenceDto: UpdateHouseSearchPrefrenceDto) {
    try{
      return await this.db.houseSearchPrefrences.update({
        where: { houseSearchIdUser: id },
        data: updateHouseSearchPrefrenceDto,
      });
    }catch(error){
      handlePrismaError(error)
    }
  }

  async remove(id: number) {
    try{
      return await this.db.houseSearchPrefrences.delete({
        where: { idHousePrefrences: id },
      });
    }catch(error){
      handlePrismaError(error)
    }
  }
}
