import { Injectable } from '@nestjs/common';
import { CreateRoommatesPrefrenceDto } from './dto/create-roommates-prefrence.dto';
import { UpdateRoommatesPrefrenceDto } from './dto/update-roommates-prefrence.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from 'generated/prisma/client';
import { roommateScoringPercentige ,type UserPlusPrefrenc} from './roommate-scoring';
import {handlePrismaError} from '../helperFunctions/helpers'


@Injectable()
export class RoommatesPrefrencesService {
  constructor(private readonly db: PrismaService) {}

  
  // CRUD METHODS
  create(createRoommatesPrefrenceDto: CreateRoommatesPrefrenceDto, userId : number) {
    try{
      return this.db.roommatesPrefrences.create({
        data: {...createRoommatesPrefrenceDto, user: {connect: {idUser: userId}}}
        
      });
    }catch(error){
      handlePrismaError(error)
    }
  }

  
  //TODO: Remake the function to be more readable and efficent
  async getMatches(id: number) {
    const balanceMatchScores = 0.7 //The wheight to adjust how much the user's prefrenc matters compared to the potentilaMatches's prefrence (0 to 1)
    
    try{
      const userToMatchRaw = await this.db.user.findUnique({
        where: { idUser: id },
        include: { roommatesPrefrences: true },
      });
  
      if (!userToMatchRaw || !userToMatchRaw.roommatesPrefrences) {
        return [];
      }
  
      // ensure types for scoring function (it expects UserPlusPrefrenc)
      const userToMatch = userToMatchRaw as unknown as UserPlusPrefrenc;
      console.log("User to match:")
      console.log(userToMatch)


      const usersRaw = await this.db.user.findMany({
        where: { idUser: { not: id } },
        include: { roommatesPrefrences: true },
      });
      
      console.log("Users to match with:")
      //console.log(usersRaw)
      // filter out users without roommatesPrefrences and compute mutual scores
      const scored = usersRaw
        //.filter((u) => !!u.roommatesPrefrences)
        .map((u) => {
          const candidate = u as unknown as UserPlusPrefrenc;
          console.log("Candidate:")
          console.log(candidate)
          const scoreA = roommateScoringPercentige(userToMatch, candidate); // user -> candidate
          const scoreB = roommateScoringPercentige(candidate, userToMatch); // candidate -> user
          const total = scoreA * balanceMatchScores + scoreB * (1-balanceMatchScores);
          return { user: u, score: total };
        })
        .sort((a, b) => b.score - a.score);
        console.log("Scored matches:")
        console.log(scored)
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
    }catch(error){
      handlePrismaError(error)
    }
  }

  findAll() {
    try{
      return this.db.roommatesPrefrences.findMany();
    }catch(error){
      handlePrismaError(error)
    }
  }

  findOne(id: number) {
    try{
      return this.db.roommatesPrefrences.findUniqueOrThrow({
        where: { idRoommatesPrefrences: id },
      });
    }catch(error){
      handlePrismaError(error)
    }
  }

  update(id: number, updateRoommatesPrefrenceDto: UpdateRoommatesPrefrenceDto) {
    try{
      return this.db.roommatesPrefrences.update({
        where: { idRoommatesPrefrences: id },
        data: updateRoommatesPrefrenceDto,
      });
    }catch(error){
      handlePrismaError(error)
    }
  }

  remove(id: number) {
    try{
      return this.db.roommatesPrefrences.delete({
        where: { idRoommatesPrefrences: id },
      });
    }catch(error){
      handlePrismaError(error)
    }
  }
}
