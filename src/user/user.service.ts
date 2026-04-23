/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  BadRequestException,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ConflictException,
  Injectable,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  InternalServerErrorException,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  NotFoundException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import * as crypto from 'node:crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import {
  handlePrismaError,
  discardFieldsNotMeantToBeChangedByUser,
} from '../helperFunctions/helpers';
import { CreateRatingDto, UpdateRatingDto } from './dto/create-rating.dto';
import { Language,UserGender } from "generated/prisma/enums";
import { User } from 'generated/prisma/client';
import {ImagesService} from '../images/images.service'

/**
 * The user handler class
 */
@Injectable()
export class UserService {
 
  
  
  constructor(private readonly db: PrismaService) {}

  //create a new user with hashed password
  /**
   * Creates new user
   *
   * @throws {ConflictException} User with same unique data already exists
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} User not found
   * @throws {InternalServerErrorException} Database opperation failed
   * @param createUserDto
   * @returns Created user data with out password
   */
  async create(createUserDto: CreateUserDto) {
    //console.log("reg service called")
    try {
      const newUser = {
        ...createUserDto,
        role: 'user',
        password: await argon2.hash(createUserDto.password), //securely hash the password before storing
      };
      //console.log(newUser)
      //console.log("reg before return")
      /*if(!newUser.gender || !Object.values(UserGender).includes(newUser.gender)){
        console.log("Bad gender input")
      }
      if(!newUser.language || !Object.values(Language).includes(newUser.language)){
        console.log("Bad language input")
      }*/
      if(!newUser.birthDay){throw new BadRequestException("Birthday is mandatory")}
      const bd = new Date(newUser.birthDay)
      return await this.db.user.create({
        data: {
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          password: newUser.password,
          hasHouse: newUser.hasHouse,
          lookingForHouse: newUser.lookingForHouse,
          lookingForPeople: newUser.lookingForPeople,
          phoneNumber: newUser.phoneNumber,
          birthDay: bd,
          connectionEmail: newUser.connectionEmail,
          gender: newUser.gender as UserGender,
          language: newUser.language as Language,
          occupation: newUser.occupation,
          userBio: newUser.userBio,
          role:'user'
        },
        omit: {
          password: true,
        },
      });
    } catch (error) {
      //console.log(error)
      handlePrismaError(error);
    }
  }

  async imageFind(userId){
    try {
      const images = await this.db.userImages.findMany({
        where: {
          userIdImages: userId,
          deleted: false,
        },
      });
      return images;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async me(user: User) {
    
    const images = await this.imageFind(user.idUser)
    return {...user,images}
  }

  /**
   * Creates a new token for the user and returns it
   *
   * @param id User's id
   * @throws {ConflictException} User with same unique data already exists
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} User not found
   * @throws {InternalServerErrorException} Database opperation failed
   * @returns Returns a new token for the user, or Error if failed to save it to database
   */
  async createToken(id: number) {
    try {
      const newToken = crypto.randomBytes(32).toString('hex'); //generate a secure random token
      await this.db.userToken.create({
        data: {
          token: newToken,
          user: {
            connect: { idUser: id },
          },
        },
      });

      return newToken;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  

  /**
   * get one user by id with necessary data
   *
   * @param id User's id
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} User not found
   * @throws {InternalServerErrorException} Database opperation failed
   * @returns the user record with only necessary data
   */
  async getNecessary(id: number) {
    try {
      return await this.db.user.findUniqueOrThrow({
        where: { idUser: id, role: "user" },
        select: {
          idUser: true,
          firstName: true,
          lastName: true,
          connectionEmail: true,
          phoneNumber: true,
          userBio: true,
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  //get one user by id and all data
  /**
   * get one user by id and all data
   *
   * @param id User's id
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} User not found
   * @throws {InternalServerErrorException} Database opperation failed
   * @returns user record with all data except password
   */
  async findOne(id: number) {
    try {
      const user = await this.db.user.findUniqueOrThrow({
        where: { idUser: id,role: "user" },
        omit: { password: true },
      });
      const images = await this.imageFind(id)
      return {...user,images}
    } catch (error) {
      handlePrismaError(error);
    }
  }

  /**
   * get all users and all data
   *
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} User not found
   * @throws {InternalServerErrorException} Database opperation failed
   * @returns returns an array of all user records with all data except password
   */
  async findAll() {
    try {
      return await this.db.user.findMany({ where:{role: "user"},omit: { password: true } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async getLikes(idUser: number) {
    
    try {
      
      const likes = await this.db.user.findMany({
        where:{
          likedBy:{
            some:{
              likerId: idUser
            }
          },
          role: "user"
        }, 
        omit:{
          password: true
        }
      })
      
      return likes
    } catch (error) {
      handlePrismaError(error)
    };
  }

  async likeUser(liker: number, likedUserId: number) {
    //console.log("userService likeUser runing")
    try {
      const isAlreadyLiked = await this.db.likedRoommate.findUnique({
        where: {
          likerId_likedUserId: {
            likerId: liker,
            likedUserId: likedUserId,
          },
        },
      });
      const likedUser = await this.db.user.findUnique({where:{idUser: likedUserId}})
      if(!likedUser || likedUser.role != "user"){throw new NotFoundException}
      //console.log(`isAlredyLiked ${isAlreadyLiked? "true": "flase"}`)
      if (isAlreadyLiked) {
        const deletedLike = await this.db.likedRoommate.delete({
          where: {
            likerId_likedUserId: {
              likerId: liker,
              likedUserId: likedUserId,
            },
          },
        });
        return { action: 'removed', data: deletedLike };
      }
      const createdLike = await this.db.likedRoommate.create({
        data: {
          likerId: liker,
          likedUserId: likedUserId,
        },
      });
      return { action: 'created', data: createdLike };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async getLikesMatches(idUser: number) {
    try {
      const mutual = await this.db.likedRoommate.findMany({
        where:{
          likerId: idUser,
          liked:{
            role: "user",
            likedRoommates:{
              some:{
                likedUserId: idUser
              }
            }
          }
        },
        include:{
          liked:{
            omit:{
              password: true
            }
          }
        }
      })
      const mutualUsers = mutual.map((mut) => mut.liked)
      return mutualUsers
    } catch (error) {
      handlePrismaError(error)
    }
  }
  async getLikesRecieved(idUser: number) {
    try {
      const likedBy = await this.db.likedRoommate.findMany({
        where:{
          likedUserId: idUser,
          liker: {
            role: "user"
          }
        },
        include:{
          liker:{
            omit:{
              password:true
            },
          }
        }
      })
      const usersWhoLikedMe = likedBy.map((like) => like.liker)
      return usersWhoLikedMe
    } catch (error) {
      handlePrismaError(error)
    }
  }

  async rateUser(
    raterId: number,
    ratedUserId: number,
    createRatingDto: CreateRatingDto,
  ) {
    try {
      //const data = discardFieldsNotMeantToBeChangedByUser(createRatingDto,'rating')
      return await this.db.roommateRatings.create({
        data: {
          ratingMessage: createRatingDto.ratingMessage,
          ratingScore: createRatingDto.ratingScore,
          raterId: raterId,
          ratedUserId: ratedUserId,
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async updateratingUser(
    raterId: number,
    ratedUserId: number,
    updateRatingDto: UpdateRatingDto,
  ) {
    try {
      const user = await this.db.user.findUnique({
        where: {
          idUser: raterId,
        },
      });

      let dtoData: Partial<UpdateRatingDto>;
      if (user && user.role == 'admin') {
        dtoData = updateRatingDto;
      } else {
        dtoData = discardFieldsNotMeantToBeChangedByUser(
          updateRatingDto,
          'rating',
        );
      }
      return await this.db.roommateRatings.update({
        where: {
          raterId_ratedUserId: {
            raterId: raterId,
            ratedUserId: ratedUserId,
          },
        },
        data: {
          ...dtoData,
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  /**
   * update user by id
   * @param id
   * @param updateUserDto
   * @throws {ConflictException} User with same unique data already exists
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} User not found
   * @throws {InternalServerErrorException} Database opperation failed
   * @returns Updated user
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.password) {
        updateUserDto.password = await argon2.hash(updateUserDto.password);
      }

      const data = discardFieldsNotMeantToBeChangedByUser(
        updateUserDto,
        'user',
      );
      if(updateUserDto.birthDay){
        updateUserDto.birthDay = new Date(updateUserDto.birthDay).toString()
      }
      

      return await this.db.user.update({
        where: { idUser: id },
        data,
        omit:{password:true}
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  /**
   * delete user by id
   *
   * @param id User's id
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} User not found
   * @throws {InternalServerErrorException} Database opperation failed
   * @returns Deleted user record
   */
  async remove(id: number) {
    try {
      return await this.db.user.delete({ where: { idUser: id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
