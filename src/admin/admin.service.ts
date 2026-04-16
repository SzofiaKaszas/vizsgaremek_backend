import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
//import { UpdateAdminDto } from './dto/update-admin.dto';
import { handlePrismaError } from 'src/helperFunctions/helpers';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly db: PrismaService) {}

  async aproveHouseRating(ratingId: number) {
    try {
      const rating = await this.db.houseListingRatings.update({
        where: { id: ratingId },
        data: { approved: true },
      });
      const allRatings = await this.db.houseListingRatings.findMany({
        where: {
          ratedHouseId: rating.ratedHouseId,
          approved: true,
        },
      });
      const totalRating = allRatings.reduce((total, rating) => {
        return total + rating.ratingScore;
      }, 0);

      const averageRating = allRatings.length
        ? totalRating / allRatings.length
        : 0;

      await this.db.houseListing.update({
        where:{idHouse: rating.ratedHouseId},
        data: {rating: averageRating}
      })
      return rating;
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async aproveRoommateRating(ratingId: number) {
    try {
      const rating = await this.db.roommateRatings.update({
        where: { id: ratingId },
        data: { approved: true },
      });
      const allRatings = await this.db.roommateRatings.findMany({
        where:{
          ratedUserId: rating.ratedUserId,
          approved: true
        }
      })
      const totalRating = allRatings.reduce((total, rating) => {return total + rating.ratingScore},0)
      const averageRating = allRatings.length ? totalRating / allRatings.length : 0;
      await this.db.user.update({
        where:{idUser: rating.ratedUserId},
        data:{rating: averageRating}
      })
      return rating
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async allUnaprovedHouseRatings() {
    try {
      return await this.db.houseListingRatings.findMany({
        where: { approved: false },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async allUnaprovedRoommateRatings() {
    try {
      return await this.db.roommateRatings.findMany({
        where: { approved: false },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async adminList() {
    try {
      return await this.db.user.findMany({
        where: { role: 'admin' },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async create(createAdminDto: CreateAdminDto) {
    try {
      const newAdmin = {
        ...createAdminDto,
        role: 'admin',
        password: await argon2.hash(createAdminDto.password),
      };
      return await this.db.user.create({
        data: {
          ...newAdmin,
        },
        omit: {
          password: true,
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
