import { Injectable } from '@nestjs/common';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { UpdateUserTokenDto } from './dto/update-user-token.dto';
import { PrismaService } from 'src/prisma.service';
import {handlePrismaError} from '../helperFunctions/helpers'
//import { Prisma } from '@prisma/client';

/**
 * Service for managing user tokens.
 *
 * Provides CRUD operations for the `userToken` table.
 */
@Injectable()
export class UserTokenService {
  constructor(private readonly db: PrismaService) {}

  

  /**
   * Creates a new user token
   * 
   * @param createUserTokenDto data for creating the token
   * @returns the created user token record
   */
  create(createUserTokenDto: CreateUserTokenDto) {
    try{
      return this.db.userToken.create({
        data: createUserTokenDto,
      });
      }catch(error){
      handlePrismaError(error)
    }
  }

  /**
   * Gets all user tokens
   * 
   * @returns an array of all the user tokens
   */
  findAll() {
    try{
      return this.db.userToken.findMany();
      }catch(error){
      handlePrismaError(error)
    }
  }

  /**
   * Retrieves a single user token by its id
   * 
   * @param id token id
   * @returns the user token record associated with the id, or null if not found
   */
  findOne(id: number) {
    try{
      return this.db.userToken.findUniqueOrThrow({
        where: { idUserToken: id },
      });
      }catch(error){
      handlePrismaError(error)
    }
  }

  /**
   * Updates a token by its id
   * 
   * @param id token id
   * @param updateUserTokenDto partial update data 
   * @returns the 
   */
  update(id: number, updateUserTokenDto: UpdateUserTokenDto) {
    try{
      return this.db.userToken.update({
        where: { idUserToken: id },
        data: updateUserTokenDto,
      });
      }catch(error){
      handlePrismaError(error)
    }
  }

  /**
   * Deletes a user token by id
   * 
   * @param id token id
   * @returns the deleted user token record
   */
  remove(id: number) {
    try{
      return this.db.userToken.delete({
        where: { idUserToken: id },
      });
      }catch(error){
      handlePrismaError(error)
    }
  }

  /**
   * Finds a user by their email address
   * !RETURNS PASSWORD! DO NOT SEND IT TO USER WITH THE PASSWORD
   *
   * @param email User's email address
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} User not found
   * @throws {InternalServerErrorException} Database opperation failed
   * @returns the user record associated with the email, or null if not found
   */
  async findByEmail(email: string) {
    try {
      return await this.db.user.findUniqueOrThrow({ where: { email: email,}, omit:{password:false} });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
