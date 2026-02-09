import { Injectable } from '@nestjs/common';
import { CreateRoommatesPrefrenceDto } from './dto/create-roommates-prefrence.dto';
import { UpdateRoommatesPrefrenceDto } from './dto/update-roommates-prefrence.dto';
import { PrismaService } from 'src/prisma.service';
import { User, RoommatesPrefrences } from 'generated/prisma/client';
import { roommateScoringPercentige } from './roommate-scoring';


@Injectable()
export class RoommatesPrefrencesService {
  constructor(private readonly db: PrismaService) {}
  // CRUD METHODS
  create(createRoommatesPrefrenceDto: CreateRoommatesPrefrenceDto) {
    return this.db.roommatesPrefrences.create({
      data: createRoommatesPrefrenceDto,
    });
  }

  async getMatchesTest(id: number) {
    const userPreferences = await this.db.roommatesPrefrences.findUnique({
      where: { roommatesPrefrencesIdUser: id },
    }) as RoommatesPrefrences;
    console.log(userPreferences)
    if (!userPreferences) {
      return [];
    }
    console.log(await this.db.user.findFirst({
      where: { firstName: "test02" },
    }))
    const matches = await this.db.user.findMany({
      omit: {password: true},
      where: {
        idUser: { not: id},
        role: "user",
        lookingForPeople: true,
        age: {
          gte: userPreferences.minAge ? userPreferences.minAge : undefined,
          lte: userPreferences.maxAge ? userPreferences.maxAge : undefined,
        },
        gender: userPreferences.gender,
        OR: [
          {language: userPreferences.language},
          {language: null}, //match users with no language preference
        ]

        
      }
    }) as User[];
    return matches;
  }

  async getMatches(id: number) {
    const userPrefrenc = await this.db.roommatesPrefrences.findUnique({
      where:{roommatesPrefrencesIdUser : id},
      include: {user: true}
    })
    const users  = await this.db.user.findMany({
      where:{
        idUser: {not: id}
      },
      include: {roommatesPrefrences: true}
    })
    users.map(()=>{
      const userPrefToMatch : number = roommateScoringPercentige(userPrefrenc.)
    })
    return [];
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
