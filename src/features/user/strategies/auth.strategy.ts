import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../../user/types/req-user';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        if (!req) {
          return null;
        }
        if (req.headers && req.headers.authorization) {
          const [type, token] = req.headers.authorization?.split(' ') ?? [];
          return type === 'Bearer' ? token : null;
        }
        return null;
      },

      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate({ sub, email }) {
    return {
      userId: sub,
      email: email,
    } as User;
  }
}
