import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { PrismaService } from 'src/prisma.service';

/**
 * Authentication strategy that validates Bearer tokens.
 *
 * This strategy:
 * - Extracts the token from the Authorization header
 * - Looks up the token in the `userToken` table
 * - Loads the associated user
 * - Rejects the request if the token is invalid
 */
@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  /**
   * Creates an instance of the TokenStrategy
   * @param db db Prisma service used for database access
   */
  constructor(private readonly db: PrismaService) {
    super();
  }

  /**
   * Validates the provided bearer token
   * 
   * @param token the token string extracted from the Authorization header
   * @returns the user that the token is linked to (omits the password)
   * @throws {ForbiddenException} if it doesnt find a token like in the params
   */
  async validate(token: string) {
    const tokenObj = await this.db.userToken.findUnique({
      where: { token: token },
    });
    if (!tokenObj) {
      throw new ForbiddenException('Invalid token');
    }
    const user = await this.db.user.findUniqueOrThrow({
      where: { idUser: tokenObj.userIdToken },
      omit: { password: true },
    });
    return user;
  }
}
