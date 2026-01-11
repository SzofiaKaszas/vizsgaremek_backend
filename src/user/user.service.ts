import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

  //create a new user
  create(createUserDto: CreateUserDto) {
    return this.db.user.create({ data: createUserDto });
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
        phoneNumber: true
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
