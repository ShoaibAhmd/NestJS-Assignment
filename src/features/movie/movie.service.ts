import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/database/entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {
  private readonly logger = new Logger(MovieService.name);

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    try {
      await this.movieRepo.save(createMovieDto);

      this.logger.log(`Movie created successfully.`);
    } catch (error) {
      this.logger.error(`Error occurred while creating movie. Error=${error}.`);

      if (error.status < 500) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  findAll() {
    return `This action returns all movie`;
  }
}
