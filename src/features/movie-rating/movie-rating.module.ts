import { Module } from '@nestjs/common';
import { MovieRatingService } from './movie-rating.service';
import { MovieRatingController } from './movie-rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRating } from '../../database/entities/movie-rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRating])],
  controllers: [MovieRatingController],
  providers: [MovieRatingService],
})
export class MovieRatingModule {}
