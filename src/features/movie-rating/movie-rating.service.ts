import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateMovieRatingDto } from './dto/create-movie-rating.dto';
import { UpdateMovieRatingDto } from './dto/update-movie-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieRating } from '../../database/entities/movie-rating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovieRatingService {
  private readonly logger = new Logger(MovieRatingService.name);

  constructor(
    @InjectRepository(MovieRating)
    private readonly movieRatingRepo: Repository<MovieRating>,
  ) { }

  async create(createMovieRatingDto: CreateMovieRatingDto) {
    try {
      const movieRating = await this.movieRatingRepo.save(createMovieRatingDto);

      const movieRatingRecord = await this.findMovieRatingById(movieRating.id);

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

  private async findMovieRatingById(movieRatingId: number) {
    return await this.movieRatingRepo.findOne({
      relations: {
        user: true,
        movie: true,
      },
      where: {
        id: movieRatingId,
      },
    });
  }
}
