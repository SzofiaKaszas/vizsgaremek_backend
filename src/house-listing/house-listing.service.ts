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
  async findAll(idUser: number) {
    try{
      return await this.db.houseListing.findMany({
        where: {
          houseIdUser: idUser,
        },
      });

    }catch(error){
      handlePrismaError(error)
    }
  }

  // get a single house listing by id
  async findOne(id: number) {
    try{
      return await this.db.houseListing.findUniqueOrThrow({
        where: { idHouse: id },
      });

    }catch(error){
      handlePrismaError(error)
    }
  }

  async likeHouse(likerUserId: number, likedHouseId: number) {
    try{
      const isAlreadyLiked = await this.db.likedHouse.findUnique({
        where:{
          userId_houseId:{
            userId: likerUserId,
            houseId: likedHouseId
          }
        }
      })
      if(isAlreadyLiked){
        const deletedLike = await this.db.likedHouse.delete({
          where:{
          userId_houseId:{
            userId: likerUserId,
            houseId: likedHouseId
          }
        }
        });
        return { action: 'removed', data: deletedLike };
      }
      const createdLike = await this.db.likedHouse.create({
        data:{
          userId: likerUserId,
          houseId: likedHouseId
        }
      })
      return { action: 'created', data: createdLike };
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
