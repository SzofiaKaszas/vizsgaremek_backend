import { Injectable } from '@nestjs/common';
import { CreateRoommatesPrefrenceDto } from './dto/create-roommates-prefrence.dto';
import { UpdateRoommatesPrefrenceDto } from './dto/update-roommates-prefrence.dto';
import { PrismaService } from 'src/prisma.service';
import { User, RoommatesPrefrences } from 'generated/prisma/client';
import { roommateScoringPercentige ,type UserPlusPrefrenc} from './roommate-scoring';


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

  //TODO: Remake the function to be more readable and efficent
  async getMatches(id: number) {
    const balanceMatchScores = 0.7 //The wheight to adjust how much the user's prefrenc matters compared to the potentilaMatches's prefrence (0 to 1)
    
    const userToMatchRaw = await this.db.user.findUnique({
      where: { idUser: id },
      include: { roommatesPrefrences: true },
    });

    if (!userToMatchRaw || !userToMatchRaw.roommatesPrefrences) {
      return [];
    }

    // ensure types for scoring function (it expects UserPlusPrefrenc)
    const userToMatch = userToMatchRaw as unknown as UserPlusPrefrenc;

    const usersRaw = await this.db.user.findMany({
      where: { idUser: { not: id } },
      include: { roommatesPrefrences: true },
    });

    // filter out users without roommatesPrefrences and compute mutual scores
    const scored = usersRaw
      .filter((u) => !!u.roommatesPrefrences)
      .map((u) => {
        const candidate = u as unknown as UserPlusPrefrenc;
        const scoreA = roommateScoringPercentige(userToMatch, candidate); // user -> candidate
        const scoreB = roommateScoringPercentige(candidate, userToMatch); // candidate -> user
        const total = scoreA * balanceMatchScores + scoreB * (1-balanceMatchScores);
        return { user: u, score: total };
      })
      .sort((a, b) => b.score - a.score);

    // choose which fields to expose from the `User` record
    const allowed = [
      'idUser',
      'firstName',
      'lastName',
      'age',
      'gender',
      'language',
      'email',
    ];

    return scored.map((s) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars
      const { roommatesPrefrences, ...userOnly } = s.user as unknown as any;
      const picked: Partial<User> = {};
      for (const key of allowed) {
        if (key in userOnly) {
          
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          (picked)[key] = (userOnly)[key];
        }
      }
      return picked as User;
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
