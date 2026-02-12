import { Injectable } from '@nestjs/common';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { UpdateUserTokenDto } from './dto/update-user-token.dto';
import { PrismaService } from 'src/prisma.service';

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
    return this.db.userToken.create({
      data: createUserTokenDto,
    });
  }

  /**
   * Gets all user tokens
   * 
   * @returns an array of all the user tokens
   */
  findAll() {
    return this.db.userToken.findMany();
  }

  /**
   * Retrieves a single user token by its id
   * 
   * @param id token id
   * @returns the user token record associated with the id, or null if not found
   */
  findOne(id: number) {
    return this.db.userToken.findUnique({
      where: { idUserToken: id },
    });
  }

  /**
   * Updates a token by its id
   * 
   * @param id token id
   * @param updateUserTokenDto partial update data 
   * @returns the 
   */
  update(id: number, updateUserTokenDto: UpdateUserTokenDto) {
    return this.db.userToken.update({
      where: { idUserToken: id },
      data: updateUserTokenDto,
    });
  }

  /**
   * Deletes a user token by id
   * 
   * @param id token id
   * @returns the deleted user token record
   */
  remove(id: number) {
    return this.db.userToken.delete({
      where: { idUserToken: id },
    });
  }
}
