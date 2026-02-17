import { BadRequestException, ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "generated/prisma/client";
import { Prisma } from 'generated/prisma/client';


/**
 * Check if user has admin role
 * @param user User object
 * @returns true if user is admin
 */
function isAdmin(user?: User): boolean {
  return user?.role === "admin";
}

/**
 * Check if user is authorized to access/modify a resource
 * @param user User object
 * @param resourceOwnerId ID of the resource owner
 * @returns true if user is admin or owns the resource
 */
function isAuthorized(user: User, resourceOwnerId: number): boolean {
  if (!user) throw new UnauthorizedException("User not provided");
  return isAdmin(user) || user.idUser === resourceOwnerId;
}

/**
 * Handles prisma errors
 * @param error Potential prisma error
 * @throws {ConflictException}
 * @throws {NotFoundException}
 * @throws {BadRequestException}
 * @throws {InternalServerErrorException}
 */
function handlePrismaError(error: unknown): never {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            throw new ConflictException(`User with this ${error.meta?.target} already exists`);
          case 'P2025':
            throw new NotFoundException('User not found');
          case 'P2003':
            throw new BadRequestException('Invalid reference provided');
          default:
            throw new InternalServerErrorException('Database operation failed');
        }
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }

export{/*checkauthorization,*/ isAdmin, isAuthorized, handlePrismaError}
