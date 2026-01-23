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
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { UpdateUserTokenDto } from './dto/update-user-token.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Controller('user-token')
export class UserTokenController {
  constructor(
    private readonly userTokenService: UserTokenService,
    private readonly userService: UserService,
  ) {}

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

  @Post()
  create(@Body() createUserTokenDto: CreateUserTokenDto) {
    return this.userTokenService.create(createUserTokenDto);
  }

  @Get()
  findAll() {
    return this.userTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTokenService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserTokenDto: UpdateUserTokenDto,
  ) {
    return this.userTokenService.update(+id, updateUserTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTokenService.remove(+id);
  }
}
