import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../../database/entities/movie.entity';
import { Repository } from 'typeorm';
import { SearchService } from '../../elastic-search/elastic-search.service';

@Injectable()
export class MovieService {
  private readonly logger = new Logger(MovieService.name);

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
    private readonly searchService: SearchService,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    try {
      const movie = await this.movieRepo.save(createMovieDto);

      await this.searchService.indexDocument('movie', movie);

      this.logger.log(`Movie created successfully.`);
    } catch (error) {
      this.logger.error(`Error occurred while creating movie. Error=${error}.`);

      if (error.status < 500) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
