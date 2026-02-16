import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { UpdateUserTokenDto } from './dto/update-user-token.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from 'generated/prisma/client';
//import { Prisma } from '@prisma/client';

/**
 * Service for managing user tokens.
 *
 * Provides CRUD operations for the `userToken` table.
 */
@Injectable()
export class UserTokenService {
  constructor(private readonly db: PrismaService) {}

  private handlePrismaError(error: unknown): never {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            throw new ConflictException(`User with this ${error.meta?.target} already exists`);
          case 'P2025':
            throw new NotFoundException('User not found');
          case 'P2003':
            throw new BadRequestException('Invalid reference provided');
          default:
            throw new InternalServerErrorException('Database operation failed');
        }
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }

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
      this.handlePrismaError(error)
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
      this.handlePrismaError(error)
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
      return this.db.userToken.findUnique({
        where: { idUserToken: id },
      });
      }catch(error){
      this.handlePrismaError(error)
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
      this.handlePrismaError(error)
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
      this.handlePrismaError(error)
    }
  }
}
