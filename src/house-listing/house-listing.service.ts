/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateHouseListingDto } from './dto/create-house-listing.dto';
import { UpdateHouseListingDto } from './dto/update-house-listing.dto';
import { PrismaService } from 'src/prisma.service';
import { handlePrismaError, discardFieldsNotMeantToBeChangedByUser } from "../helperFunctions/helpers"
import { CreateRatingDto, UpdateRatingDto } from 'src/user/dto/create-rating.dto';

@Injectable()
export class HouseListingService {




  constructor(private readonly db: PrismaService) { }

  // create a new house listing
  async create(createHouseListingDto: CreateHouseListingDto) {
    try {
      return await this.db.houseListing.create({
        data: {
          houseIdUser: createHouseListingDto.houseIdUser,
          airConditioner: createHouseListingDto.airConditioner,
          bathrooms: createHouseListingDto.bathrooms,
          city: createHouseListingDto.city,
          description: createHouseListingDto.description,
          furnishingLevel: createHouseListingDto.furnishingLevel,
          heatingType: createHouseListingDto.heatingType,
          kitchenLevel: createHouseListingDto.kitchenLevel,
          location: createHouseListingDto.location,
          numberOfRooms: createHouseListingDto.numberOfRooms,
          propertyType: createHouseListingDto.propertyType,
          rent: createHouseListingDto.rent,
          squareMeter: createHouseListingDto.squareMeter,
          whichFloor: createHouseListingDto.whichFloor,
        },

        select: {
          idHouse: true,
        },
      });

    } catch (error) {
      handlePrismaError(error);
    }
  }

  // get all house listings
  async findAll(idUser: number) {
    try {
      const allListings =  await this.db.houseListing.findMany({
        where: {
          houseIdUser: idUser,
        },
      });

      const HousesWithImages = await Promise.all(allListings.map(async (house) => {
        const houseImages = await this.db.houseImages.findMany({
          where: {
            houseIdImages: house.idHouse,
            deleted: false,
          }
        });
        return { ...house, images: houseImages };
      }));
      return HousesWithImages;

    } catch (error) {
      handlePrismaError(error)
    }
  }

  // get a single house listing by id
  async findOne(id: number) {
    try {
      const house = await this.db.houseListing.findUniqueOrThrow({
        where: { idHouse: id },
      });

      const houseImages = await this.db.houseImages.findMany({
        where: {
          houseIdImages: house.idHouse,
          deleted: false,
        }
      })

      return { ...house, images: houseImages };
    } catch (error) {
      handlePrismaError(error)
    }
  }

  async getLikes(idUser: number) {
    try {
      const likes = await this.db.houseListing.findMany({
        where: {
          likedBy: {
            some: {
              userId: idUser
            }
          }
        }
      })
      const likedHousesWithImages = await Promise.all(likes.map(async (house) => {
        const houseImages = await this.db.houseImages.findMany({
          where: {
            houseIdImages: house.idHouse,
            deleted: false,
          }
        });
        return { ...house, images: houseImages };
      }));
      return likedHousesWithImages;

    } catch (error) {
      handlePrismaError(error)
    }
  }

  async likeHouse(likerUserId: number, likedHouseId: number) {
    try {
      const isAlreadyLiked = await this.db.likedHouse.findUnique({
        where: {
          userId_houseId: {
            userId: likerUserId,
            houseId: likedHouseId
          }
        }
      })
      if (isAlreadyLiked) {
        const deletedLike = await this.db.likedHouse.delete({
          where: {
            userId_houseId: {
              userId: likerUserId,
              houseId: likedHouseId
            }
          }
        });
        return { action: 'removed', data: deletedLike };
      }
      const createdLike = await this.db.likedHouse.create({
        data: {
          userId: likerUserId,
          houseId: likedHouseId
        }
      })
      return { action: 'created', data: createdLike };
    } catch (error) {
      handlePrismaError(error)
    }
  }

  async rateHouse(raterUserId: number, ratedHouseId: number, createRatingDto: CreateRatingDto) {
    try {
      const isItTheirHouse = await this.db.houseListing.findUnique({
        where: {
          idHouse: ratedHouseId
        }
      })
      if (!isItTheirHouse) { throw new BadRequestException(`there is no house with id:${ratedHouseId}`) }
      if (raterUserId == isItTheirHouse.houseIdUser) { throw new ForbiddenException('user is not allowed to rate their own house') }
      return await this.db.houseListingRatings.create({
        data: {
          ratingMessage: createRatingDto.ratingMessage,
          ratingScore: createRatingDto.ratingScore,
          raterId: raterUserId,
          ratedHouseId: ratedHouseId
        }
      })
    } catch (error) {
      handlePrismaError(error)
    }
  }

  async updateratingHouse(raterUserId: number, ratedHouseId: number, updateRatingDto: UpdateRatingDto) {
    try {
      const dtoData = discardFieldsNotMeantToBeChangedByUser(updateRatingDto, 'rating')
      return await this.db.houseListingRatings.update({
        where: {
          raterId_ratedHouseId: {
            raterId: raterUserId,
            ratedHouseId: ratedHouseId
          }
        },
        data: {
          ...dtoData
        }

      })
    } catch (error) {
      handlePrismaError(error)
    }
  }


  // update a house listing by id
  async update(id: number, updateHouseListingDto: UpdateHouseListingDto) {
    try {
      const dtoData = discardFieldsNotMeantToBeChangedByUser(updateHouseListingDto, 'houseListing')
      return await this.db.houseListing.update({
        where: { idHouse: id },
        data: dtoData,
      });

    } catch (error) {
      handlePrismaError(error)
    }
  }

  // delete a house listing by id
  async remove(id: number) {
    try {
      return await this.db.houseListing.delete({
        where: { idHouse: id },
      });

    } catch (error) {
      handlePrismaError(error)
    }
  }
}
