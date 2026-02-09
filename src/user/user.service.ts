import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as crypto from 'node:crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { PrismaClientKnownRequestError } from 'generated/prisma/internal/prismaNamespace';

/**
 * The user handler class
 */
@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

  //create a new user with hashed password
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            console.error('Duplicate entry detected:', error.meta?.target);
            break;
          case 'P2025':
            console.error('Record not found:', error.meta?.cause);
            break;
          default:
            console.error('Prisma error:', error.message);
        }
      }
      
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

    }catch(err){
      return err as PrismaClientKnownRequestError
    }
  }

  //find user by email
  findByEmail(email: string) {
    return this.db.user.findUnique({ where: { email: email } });
  }

  //get one user by id with necessary data
  getNecessary(id: number) {
    return this.db.user.findUnique({
      where: { idUser: id },
      select: {
        idUser: true,
        firstName: true,
        lastName: true,
        connectionEmail: true,
        phoneNumber: true,
      },
    });
  }

  //get one user by id and all data
  findOne(id: number) {
    return this.db.user.findUnique({ where: { idUser: id } });
  }

  //get all users and all data
  findAll() {
    return this.db.user.findMany();
  }

  //update user by id
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.db.user.update({
      where: { idUser: id },
      data: updateUserDto,
    });
  }

  //delete user by id
  remove(id: number) {
    return this.db.user.delete({ where: { idUser: id } });
  }
}
