import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateHouseSearchPrefrenceDto } from './dto/create-house-search-prefrence.dto';
import { UpdateHouseSearchPrefrenceDto } from './dto/update-house-search-prefrence.dto';
import { PrismaService } from 'src/prisma.service';
import { handlePrismaError } from 'src/helperFunctions/helpers';
import { HouseListing} from 'generated/prisma/client';
import {houseScoringPercentage} from './house-scoring'

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

  async getHouseMatches(id: number){
    try{
      const userHousePrefrenc = await this.db.houseSearchPrefrences.findFirstOrThrow({
        where:{houseSearchIdUser : id}
      })
      const houseList : HouseListing[] = await this.db.houseListing.findMany({
        where:{houseIdUser: {not: id}}
      })
      if(!userHousePrefrenc){throw new BadRequestException('User does not have HousePrefrenc')}
      if(!houseList){throw new InternalServerErrorException}
      const scored = houseList.map((h) => {
        const candidate : HouseListing = h
        const score = houseScoringPercentage(userHousePrefrenc,candidate)
        return {houseListing : h, score: score}
      })
      .sort((a,b) => b.score - a.score);

      return scored.map((s) => {
        return s.houseListing
      })




    }catch(error){
      handlePrismaError(error)
    }
  }
}
