import { Injectable } from '@nestjs/common';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { UpdateUserTokenDto } from './dto/update-user-token.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserTokenService {
  constructor(private readonly db: PrismaService) {}

  //create user token
  create(createUserTokenDto: CreateUserTokenDto) {
    return this.db.userToken.create({
      data: createUserTokenDto,
    });
  }

  //find all user tokens
  findAll() {
    return this.db.userToken.findMany();
  }

  //find one user token by id
  findOne(id: number) {
    return this.db.userToken.findUnique({
      where: { idUserToken: id },
    });
  }

  //update user token by id
  update(id: number, updateUserTokenDto: UpdateUserTokenDto) {
    return this.db.userToken.update({
      where: { idUserToken: id },
      data: updateUserTokenDto,
    });
  }

  //remove user token by id
  remove(id: number) {
    return this.db.userToken.delete({
      where: { idUserToken: id },
    });
  }
}
