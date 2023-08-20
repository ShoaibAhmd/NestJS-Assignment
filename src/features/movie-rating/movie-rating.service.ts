import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateMovieRatingDto } from './dto/create-movie-rating.dto';
import { UpdateMovieRatingDto } from './dto/update-movie-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieRating } from 'src/database/entities/movie-rating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovieRatingService {
  private readonly logger = new Logger(MovieRatingService.name);

  constructor(
    @InjectRepository(MovieRating)
    private readonly movieRatingRepo: Repository<MovieRating>,
  ) {}

  async create(createMovieRatingDto: CreateMovieRatingDto) {
    try {
      await this.movieRatingRepo.save(createMovieRatingDto);

      this.logger.log(`Movie rating created successfully.`);
    } catch (error) {
      this.logger.error(
        `Error occurred while creating movie rating. Error=${error}.`,
      );
      if (error.status < 500) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  findAll() {
    return `This action returns all movieRating`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movieRating`;
  }

  update(id: number, updateMovieRatingDto: UpdateMovieRatingDto) {
    return `This action updates a #${id} movieRating`;
  }

  remove(id: number) {
    return `This action removes a #${id} movieRating`;
  }
}
