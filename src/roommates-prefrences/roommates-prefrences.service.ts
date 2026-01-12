import { Injectable } from '@nestjs/common';
import { CreateRoommatesPrefrenceDto } from './dto/create-roommates-prefrence.dto';
import { UpdateRoommatesPrefrenceDto } from './dto/update-roommates-prefrence.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoommatesPrefrencesService {
  constructor(private readonly db: PrismaService) {}
  // CRUD METHODS
  create(createRoommatesPrefrenceDto: CreateRoommatesPrefrenceDto) {
    return this.db.roommatesPrefrences.create({
      data: createRoommatesPrefrenceDto,
    });
  }

  findAll() {
    return this.db.roommatesPrefrences.findMany();
  }

  findOne(id: number) {
    return this.db.roommatesPrefrences.findUnique({
      where: { idRoommatesPrefrences: id },
    });
  }

  update(id: number, updateRoommatesPrefrenceDto: UpdateRoommatesPrefrenceDto) {
    return this.db.roommatesPrefrences.update({
      where: { idRoommatesPrefrences: id },
      data: updateRoommatesPrefrenceDto,
    });
  }

  remove(id: number) {
    return this.db.roommatesPrefrences.delete({
      where: { idRoommatesPrefrences: id },
    });
  }
}
