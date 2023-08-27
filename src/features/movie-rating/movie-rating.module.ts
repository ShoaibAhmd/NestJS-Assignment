import { Module } from '@nestjs/common';
import { MovieRatingService } from './movie-rating.service';
import { MovieRatingController } from './movie-rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRating } from '../../database/entities/movie-rating.entity';
import { ElasticSearchModule } from '../../elastic-search/elastic-search.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRating]), ElasticSearchModule],
  controllers: [MovieRatingController],
  providers: [MovieRatingService],
})
export class MovieRatingModule {}
