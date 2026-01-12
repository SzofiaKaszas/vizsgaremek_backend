import { Injectable } from '@nestjs/common';
import { CreateUserLoginDto } from './dto/create-user-login.dto';
import { UpdateUserLoginDto } from './dto/update-user-login.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserLoginService {
  constructor(private readonly db: PrismaService) {}
  //create a new user login
  create(createUserLoginDto: CreateUserLoginDto) {
    return this.db.userLogin.create({
      data: createUserLoginDto,
    });
  }

  //get all user logins
  findAll() {
    return this.db.userLogin.findMany();
  }

  //get a user login by id
  findOne(id: number) {
    return this.db.userLogin.findUnique({
      where: { idUserLogin: id },
    });
  }

  //update a user login by id
  update(id: number, updateUserLoginDto: UpdateUserLoginDto) {
    return this.db.userLogin.update({
      where: { idUserLogin: id },
      data: updateUserLoginDto,
    });
  }

  //delete a user login by id
  remove(id: number) {
    return this.db.userLogin.delete({
      where: { idUserLogin: id },
    });
  }
}
