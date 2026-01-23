import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly db: PrismaService) {
    super();
  }

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
