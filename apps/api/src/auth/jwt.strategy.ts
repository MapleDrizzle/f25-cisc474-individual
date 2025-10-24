import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/prisma.service';

dotenv.config();

type JwtPayload = {
  sub: string; // e.g. "auth0|abc123" or "google-oauth2|xyz"
  iss: string;
  aud: string | string[];
  name?: string;
  email?: string;
  scope?: string;
};

export interface JwtUser {
  id: string;
  auth0Id: string;
  email?: string;
  name?: string;
  scopes: string[];
}
/*
function splitSub(sub: string) {
  // "provider|id" → { provider, providerId }
  const [provider, ...rest] = sub.split('|');
  return { provider, providerId: rest.join('|') };
}*/

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_ISSUER_URL}`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload): Promise<JwtUser> {
    // You can see the JWT here
    // console.log('JWT payload', payload);

    const { sub, name, email } = payload;

    // Find the user by auth0Id (sub)
    let user = await this.prisma.user.findUnique({
      where: { auth0Id: sub },
    });

    // If the user doesn't exist, create them
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          auth0Id: sub,
          name: name ?? null,
          email: email ?? null,
          role: 'STUDENT', // or default role of your choice
        },
      });
    } else {
      // Optionally update user info if changed
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          name: name ?? user.name,
          email: email ?? user.email,
        },
      });
    }

    return {
      id: user.id,
      auth0Id: sub,
      email: user.email ?? undefined,
      name: user.name ?? undefined,
      scopes: (payload.scope ?? '').split(' ').filter(Boolean),
    };
  }
}