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
/**
 * Calculates what percentage a value represents between preferred and maximum deviation
 * @param value The actual value to evaluate
 * @param preferredNumber The ideal value (100%)
 * @param maximumDeviationNumber The threshold where it reaches 0%
 * @returns number between 0 and 1
 * @throws {BadRequestException} if inputs are invalid
 */
function calculateOutsidePreferencePercentage(
  value: number,
  preferredNumber: number,
  maximumDeviationNumber: number,
): number {
  // Validate inputs - check for null/undefined and type
  if (value == null || preferredNumber == null || maximumDeviationNumber == null) {
    throw new BadRequestException('All parameters (value, preferredNumber, maximumDeviationNumber) are required');
  }

  // Check that preferred and maximum are different to avoid division by zero
  if (preferredNumber === maximumDeviationNumber) {
    throw new BadRequestException('preferredNumber and maximumDeviationNumber cannot be equal');
  }

  // Calculate percentage based on deviation from preferred value
  const deviation = Math.abs(value - preferredNumber);
  const maxDeviation = Math.abs(maximumDeviationNumber - preferredNumber);
  const percentage = 1 - (deviation / maxDeviation);

  // Clamp to 0-1 range
  return Math.max(0, Math.min(1, percentage));
}

function isSoonerInList(orderedList : any[], value: any, beforeThanThis : any) : boolean {
  const valueIndex = orderedList.indexOf(value)
  const beforeThanThisIndex = orderedList.indexOf(beforeThanThis)

  if(valueIndex === -1 || beforeThanThisIndex === -1){return false}
  return valueIndex <= beforeThanThisIndex
}

export{/*checkauthorization,*/ isAdmin, isAuthorized, handlePrismaError, calculateOutsidePreferencePercentage, isSoonerInList}
