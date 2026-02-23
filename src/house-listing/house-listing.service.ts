import { Injectable } from '@nestjs/common';
import { CreateHouseListingDto } from './dto/create-house-listing.dto';
import { UpdateHouseListingDto } from './dto/update-house-listing.dto';
import { PrismaService } from 'src/prisma.service';
import {handlePrismaError} from "../helperFunctions/helpers"

@Injectable()
export class HouseListingService {
  constructor(private readonly db: PrismaService) {}

  // create a new house listing
  async create(createHouseListingDto: CreateHouseListingDto) {
    try{
      return await this.db.houseListing.create({
        data: createHouseListingDto,
      });

    }catch(error){
      handlePrismaError(error)
    }
  }

  // get all house listings
  async findAll() {
    try{
      return await this.db.houseListing.findMany();

    }catch(error){
      handlePrismaError(error)
    }
  }

  // get a single house listing by id
  async findOne(id: number) {
    try{
      return await this.db.houseListing.findUnique({
        where: { idHouse: id },
      });

    }catch(error){
      handlePrismaError(error)
    }
  }

  // update a house listing by id
  async update(id: number, updateHouseListingDto: UpdateHouseListingDto) {
    try{
      return await this.db.houseListing.update({
        where: { idHouse: id },
        data: updateHouseListingDto,
      });

    }catch(error){
      handlePrismaError(error)
    }
  }

  // delete a house listing by id
  async remove(id: number) {
    try{
      return await this.db.houseListing.delete({
        where: { idHouse: id },
      });

    }catch(error){
      handlePrismaError(error)
    }
  }
}
