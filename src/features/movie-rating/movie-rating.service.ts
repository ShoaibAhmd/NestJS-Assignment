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
import { SearchService } from '../../elastic-search/elastic-search.service';

@Injectable()
export class MovieRatingService {
  private readonly logger = new Logger(MovieRatingService.name);

  constructor(
    @InjectRepository(MovieRating)
    private readonly movieRatingRepo: Repository<MovieRating>,
    private readonly searchService: SearchService,
  ) {}

  async create(createMovieRatingDto: CreateMovieRatingDto) {
    try {
      const movieRating = await this.movieRatingRepo.save(createMovieRatingDto);

      const movieRatingRecord = await this.findMovieRatingById(movieRating.id);

      await this.searchService.indexDocument('movie-rating', movieRatingRecord);

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

  async search(query: string, range?: string, filters?: string[]) {
    try {
      const rangeArray: string[] = range ? range.split(':') : [];
      const filtersArray = filters
        ? filters.map((filter) => {
            const filterItem = filter.split(':');
            return { [filterItem[0]]: filterItem[1] };
          })
        : [];

      return await this.searchService.search(
        'movie-rating',
        query,
        [
          'movie.name',
          'movie.description',
          'movie.genre',
          'movie.country',
          'comment',
        ],
        rangeArray &&
          rangeArray.length === 3 && {
            [rangeArray[0]]: { [rangeArray[1]]: rangeArray[2] },
          },
        filtersArray.length && filtersArray,
      );
    } catch (error) {
      this.logger.error(
        `Error occurred while searching movie. Error=${error}.`,
      );
      if (error.status < 500) throw error;

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
