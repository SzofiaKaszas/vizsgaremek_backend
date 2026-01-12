import { Injectable } from '@nestjs/common';
import { CreateHouseAttributeDto } from './dto/create-house-attribute.dto';
import { UpdateHouseAttributeDto } from './dto/update-house-attribute.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HouseAttributesService {
  constructor(private readonly db : PrismaService) {}

  create(createHouseAttributeDto: CreateHouseAttributeDto) {
    return this.db.houseAttributes.create({
      data: createHouseAttributeDto,
    });
  }

  findAll() {
    return this.db.houseAttributes.findMany();
  }

  findOne(id: number) {
    return this.db.houseAttributes.findUnique({
      where: { idHouseAttributes: id },
    });
  }

  update(id: number, updateHouseAttributeDto: UpdateHouseAttributeDto) {
    return this.db.houseAttributes.update({
      where: { idHouseAttributes: id },
      data: updateHouseAttributeDto,
    });
  }

  remove(id: number) {
    return this.db.houseAttributes.delete({
      where: { idHouseAttributes: id },
    });
  }
}
