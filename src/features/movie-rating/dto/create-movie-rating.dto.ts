import { IsInstance, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Movie } from '../../../database/entities/movie.entity';
import { User } from '../../../database/entities/user.entity';

export class CreateMovieRatingDto {
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsString()
  comment: string;

  @IsInstance(User)
  user: User;

  @IsInstance(Movie)
  movie: Movie;
}
