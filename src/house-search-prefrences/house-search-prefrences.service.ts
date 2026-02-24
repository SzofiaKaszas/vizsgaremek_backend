import { Injectable } from '@nestjs/common';
import { CreateHouseSearchPrefrenceDto } from './dto/create-house-search-prefrence.dto';
import { UpdateHouseSearchPrefrenceDto } from './dto/update-house-search-prefrence.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HouseSearchPrefrencesService {
  constructor(private readonly db : PrismaService) {}
  create(createHouseSearchPrefrenceDto: CreateHouseSearchPrefrenceDto) {
    return this.db.houseSearchPrefrences.create({
      data: createHouseSearchPrefrenceDto,
    });
  }

  findAll() {
    return this.db.houseSearchPrefrences.findMany();
  }

  findOne(id: number) {
    return this.db.houseSearchPrefrences.findUnique({
      where: { idHousePrefrences: id },
    });
  }

  update(id: number, updateHouseSearchPrefrenceDto: UpdateHouseSearchPrefrenceDto) {
    return this.db.houseSearchPrefrences.update({
      where: { houseSearchIdUser: id },
      data: updateHouseSearchPrefrenceDto,
    });
  }

  remove(id: number) {
    return this.db.houseSearchPrefrences.delete({
      where: { idHousePrefrences: id },
    });
  }
}
