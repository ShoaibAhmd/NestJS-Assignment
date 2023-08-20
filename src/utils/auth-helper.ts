import { InternalServerErrorException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import hmacService from './hmac';
import { TokenPayload, Tokens } from 'src/features/user/types/auth-types';

class AuthHelper {
  private readonly logger = new Logger(AuthHelper.name);
  private readonly jwtService = new JwtService();

  encodePassword(password: string): string {
    return hmacService.createSignature(password);
  }

  async signTokens(tokenPayload: TokenPayload): Promise<Tokens> {
    try {
      const accessToken = await this.jwtService.signAsync(tokenPayload, {
        secret: process.env.JWT_SECRET,
        expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRY),
      });

      const refreshToken = await this.jwtService.signAsync(tokenPayload, {
        secret: process.env.REFRESH_JWT_SECRET,
        expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRY),
      });

      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } catch (error) {
      this.logger.error(
        `Error occurred while signing the tokens for the user=${tokenPayload.sub}. Error=${error}.`,
      );

      throw new InternalServerErrorException('common.SOME_THING_WENT_WRONG');
    }
  }
}

const authHelper = new AuthHelper();

export default authHelper;
