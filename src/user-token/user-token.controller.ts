import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserTokenService } from './user-token.service';
import { UpdateUserTokenDto } from './dto/update-user-token.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CreateUserTokenDto } from './dto/create-user-token.dto';

/**
 * Controller for managing user tokens
 *
 * Handles:
 * -Login
 * -CRUD for user tokens
 */
@ApiExtraModels(CreateUserTokenDto)
@Controller('user-token')
export class UserTokenController {
  constructor(
    private readonly userTokenService: UserTokenService,
    private readonly userService: UserService,
  ) {}

  /**
   * Login for a user using email and password
   *
   * @param loginDto login data (email, password)
   * @returns an object containing the token that's just been created
   */
  @ApiBody({
    description: 'Login credentials',
    schema: {
      example: {
        email: 'user@example.com',
        password: 'strongPassword123',
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Successfully logged in. Returns a newly created token.',
  })
  @ApiForbiddenResponse({ description: 'Invalid email or password' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (user === null) {
      throw new ForbiddenException('Invalid email or password');
    }
    if (!(await argon2.verify(user.password, loginDto.password))) {
      throw new ForbiddenException('Invalid email or password');
    }
    return {
      token: await this.userService.createToken(user.idUser),
    };
  }

  /**
   * Gets all user tokens
   *
   * @returns an array of all user token records
   *
   * TODO: authenticate so only admin user can do this
   */
  @ApiOkResponse({ description: 'Ok. Returns all tokens' })
  @Get()
  findAll() {
    return this.userTokenService.findAll();
  }

  /**
   * Gets one token by its id (not sure if needed)
   *
   * @param id token id
   * @returns the token thats the users
   */
  @ApiParam({ name: 'id', description: 'id of the token updated', example: 25 })
  @ApiOkResponse({ description: 'Ok. Returns one token by its id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTokenService.findOne(+id);
  }

  /**
   * Updates a tokens data in the table by the tokens id
   *
   * @param id token id
   * @param updateUserTokenDto partial update data
   * @returns the updated user token record
   */
  @ApiBody({
    description: 'Fields to update for the user token',
    schema: {
      example: {
        userIdToken: 42,
        token:
          'f8bf1a217dde79dad1219f11345ca5ef792d341e556b7c1cf11576274c9a9062',
      },
    },
  })
  @ApiParam({ name: 'id', description: 'id of the token updated', example: 42 })
  @ApiBody({
    description: 'fields to update',
    schema: {
      example: {
        token: 'token',
      },
    },
  })
  @ApiOkResponse({
    description: 'Ok. Updating token successful',
    type: CreateUserTokenDto,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserTokenDto: UpdateUserTokenDto,
  ) {
    return this.userTokenService.update(+id, updateUserTokenDto);
  }

  /**
   * Deletes user token by token id
   *
   * @param id token id
   * @returns the deleted user token record
   */
  @ApiParam({ name: 'id', description: 'id of the token updated', example: 42 })
  @ApiOkResponse({
    description: 'Ok. Token deleted successfully',
    type: CreateUserTokenDto,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTokenService.remove(+id);
  }
}
