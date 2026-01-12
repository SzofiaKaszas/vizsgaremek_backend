import { Injectable } from '@nestjs/common';
import { CreateRoommatesPrefrenceDto } from './dto/create-roommates-prefrence.dto';
import { UpdateRoommatesPrefrenceDto } from './dto/update-roommates-prefrence.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoommatesPrefrencesService {
  constructor(private readonly db: PrismaService) {}
  // CRUD METHODS
  create(createRoommatesPrefrenceDto: CreateRoommatesPrefrenceDto) {
    return this.db.roommatesPrefrence.create({
      data: createRoommatesPrefrenceDto,
    });
  }

  findAll() {
    return this.db.roommatesPrefrence.findMany();
  }

  findOne(id: number) {
    return this.db.roommatesPrefrence.findUnique({
      where: { id },
    });
  }

  update(id: number, updateRoommatesPrefrenceDto: UpdateRoommatesPrefrenceDto) {
    return this.db.roommatesPrefrence.update({
      where: { id },
      data: updateRoommatesPrefrenceDto,
    });
  }

  remove(id: number) {
    return this.db.roommatesPrefrence.delete({
      where: { id },
    });
  }
}
