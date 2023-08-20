import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import authHelper from 'src/utils/auth-helper';
import { SignInDto } from './dto/sign-in.dto';
import hmacService from 'src/utils/hmac';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    try {
      const userFromDB = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });

      if (userFromDB) {
        throw new ConflictException('User already registered.');
      }

      const user = await this.userRepository.save({
        ...createUserDto,
        password: authHelper.encodePassword(createUserDto.password),
      });

      return user;
    } catch (error) {
      this.logger.error(
        `Error occurred while sign-up process for user=${createUserDto.email}. Error=${error}.`,
      );

      if (error.status < 500) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong.');
    }
  }

  async signin(signInDto: SignInDto) {
    try {
      const userFromDB = await this.userRepository.findOneBy({
        email: signInDto.email,
      });

      if (!userFromDB) {
        throw new NotFoundException('User not found');
      }

      const hashedPassword = hmacService.createSignature(signInDto.password);

      if (hashedPassword !== userFromDB.password) {
        throw new UnauthorizedException();
      }

      const tokens = authHelper.signTokens({
        sub: userFromDB.id,
        email: userFromDB.email,
      });

      return tokens;
    } catch (error) {
      this.logger.error(
        `Error occurred while sign-in process for user=${signInDto.email}. Error=${error}.`,
      );
      if (error.status < 500) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
