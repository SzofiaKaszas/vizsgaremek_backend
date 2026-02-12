import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as crypto from 'node:crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from 'generated/prisma/client';

/**
 * The user handler class
 */
@Injectable()
export class UserService {
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

  //create a new user with hashed password
  /**
   * Creates new user
   * 
   * @throws {ConflictException} User with same unique data already exists 
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} How?
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
      this.handlePrismaError(error)
      
    }
  }

  /**
   * Creates a new token for the user and returns it
   * 
   * @param id User's id
   * @throws {PrismaClientKnownRequestError}
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
      this.handlePrismaError(error)
      
    }
  }

  //find user by email
  async findByEmail(email: string) {
    try{
      return await this.db.user.findUniqueOrThrow({ where: { email: email } });

    }catch(error){
      this.handlePrismaError(error)
      
    }
  }

  //get one user by id with necessary data
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
      this.handlePrismaError(error)
      
    }
  }

  //get one user by id and all data
  async findOne(id: number) {
    try{
      return await this.db.user.findUniqueOrThrow({ where: { idUser: id }, omit:{password: true} });
    }catch(error){
      this.handlePrismaError(error) 
    }
  }

  //get all users and all data
  async findAll() {
    try{
      return await this.db.user.findMany();
    }catch(error){
      this.handlePrismaError(error) 
    }
  }

  //update user by id
  async update(id: number, updateUserDto: UpdateUserDto) {
    try{
      return await this.db.user.update({
        where: { idUser: id },
        data: updateUserDto,
      });
    }catch(error){
      this.handlePrismaError(error) 
    }
  }

  //delete user by id
  async remove(id: number) {
    try{
      return await this.db.user.delete({ where: { idUser: id } });
    }catch(error){
      this.handlePrismaError(error) 
    }
  }
}
