// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as crypto from 'node:crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import {handlePrismaError} from '../helperFunctions/helpers'

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
    try{
      const newUser = {
        ...createUserDto,
        role: 'user',
        password: await argon2.hash(createUserDto.password), //securely hash the password before storing
      };
      return await this.db.user.create({
        data: newUser,
        omit: {
          password: true,
        },
      });

    }catch(error){
      handlePrismaError(error)
      
    }
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
    try{
      const newToken = crypto.randomBytes(32).toString('hex'); //generate a secure random token
      await this.db.userToken.create({
        data: {
          token: newToken,
          user: {
            connect: { idUser: id },
          },
        },
      });
      
     return newToken

    }catch(error){
      handlePrismaError(error)
      
    }
  }

  /**
   * Finds a user by their email address
   * 
   * @param email User's email address
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} User not found
   * @throws {InternalServerErrorException} Database opperation failed
   * @returns the user record associated with the email, or null if not found
   */
  async findByEmail(email: string) {
    try{
      return await this.db.user.findUniqueOrThrow({ where: { email: email } });

    }catch(error){
      handlePrismaError(error)
      
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
    try{
      return await this.db.user.findUniqueOrThrow({
        where: { idUser: id },
        select: {
          idUser: true,
          firstName: true,
          lastName: true,
          connectionEmail: true,
          phoneNumber: true,
        },
      });

    }catch(error){
      handlePrismaError(error)
      
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
    try{
      return await this.db.user.findUniqueOrThrow({ where: { idUser: id }, omit:{password: true} });
    }catch(error){
      handlePrismaError(error) 
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
    try{
      return await this.db.user.findMany({ omit:{password: true} });
    }catch(error){
      handlePrismaError(error) 
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
    try{
      if(updateUserDto.password){
        updateUserDto.password = await argon2.hash(updateUserDto.password)
      }
      return await this.db.user.update({
        where: { idUser: id },
        data: updateUserDto,
      });
    }catch(error){
      handlePrismaError(error) 
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
    try{
      return await this.db.user.delete({ where: { idUser: id } });
    }catch(error){
      handlePrismaError(error) 
    }
  }
}
