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
  /**
   * Creates new prefrences for user
   * @param createRoommatesPrefrenceDto  Data for creating the prefrences
   * @param userId  User's id to connect the prefrences to
   * @throws {BadRequestException} Bad request
   * @throws {InternalServerErrorException} Database opperation failed
   * @returns 
   */
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
  /**
   * 
   * @param id user's id to find the prefrences to match with other users
   * @throws {BadRequestException} Bad request
   * @throws {NotFoundException} User not found 
   * @throws {InternalServerErrorException} Database opperation failed
   * @returns   returns an array of users that are sorted by how good they match with the user with the given id, the array can be empty if there are no other users or if the user with the given id has no prefrences
   */
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
    }catch(error){
      handlePrismaError(error)
    }
  }
  /**
   * all preference data
   * @returns  returns an array of all preferenc records with all data
   */
  findAll() {
    try{
      return this.db.roommatesPrefrences.findMany();
    }catch(error){
      handlePrismaError(error)
    }
  }
  /**
   * finds a specific preference record by id
   * @param id idRoommatesPrefrences
   * @returns 
   */
  findOne(id: number) {
    try{
      return this.db.roommatesPrefrences.findUniqueOrThrow({
        where: { idRoommatesPrefrences: id },
      });
    }catch(error){
      handlePrismaError(error)
    }
  }
  /**
   * updates a specific preference record by id
   * @param id idRoommatesPrefrences
   * @param updateRoommatesPrefrenceDto 
   * @returns  Updated preference record
   */
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
  /**
   * Deletes a preference record by id
   * @param id idRoommatesPrefrences
   * @returns 
   */
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
