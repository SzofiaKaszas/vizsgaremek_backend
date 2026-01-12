import { Injectable } from '@nestjs/common';
import { CreateUserLoginDto } from './dto/create-user-login.dto';
import { UpdateUserLoginDto } from './dto/update-user-login.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserLoginService {
  constructor(private readonly db: PrismaService) {}
  create(createUserLoginDto: CreateUserLoginDto) {
    return this.db.userLogin.create({
      data: createUserLoginDto,
    });
  }

  findAll() {
    return this.db.userLogin.findMany();
  }

  findOne(id: number) {
    return this.db.userLogin.findUnique({
      where: { idUserLogin: id },
    });
  }

  update(id: number, updateUserLoginDto: UpdateUserLoginDto) {
    return this.db.userLogin.update({
      where: { idUserLogin: id },
      data: updateUserLoginDto,
    });
  }

  remove(id: number) {
    return this.db.userLogin.delete({
      where: { idUserLogin: id },
    });
  }
}
