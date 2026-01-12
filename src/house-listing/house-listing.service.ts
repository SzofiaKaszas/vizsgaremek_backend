import { Injectable } from '@nestjs/common';
import { CreateHouseListingDto } from './dto/create-house-listing.dto';
import { UpdateHouseListingDto } from './dto/update-house-listing.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HouseListingService {
  constructor(private readonly db: PrismaService) {}
  create(createHouseListingDto: CreateHouseListingDto) {
    return this.db.houseListing.create({
      data: createHouseListingDto,
    });
  }

  findAll() {
    return this.db.houseListing.findMany();
  }

  findOne(id: number) {
    return this.db.houseListing.findUnique({
      where: { idHouse: id },
    });
  }

  update(id: number, updateHouseListingDto: UpdateHouseListingDto) {
    return this.db.houseListing.update({
      where: { idHouse: id },
      data: updateHouseListingDto,
    });
  }

  remove(id: number) {
    return this.db.houseListing.delete({
      where: { idHouse: id },
    });
  }
}
