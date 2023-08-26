import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../../database/entities/movie.entity';
import { ElasticSearchModule } from '../../elastic-search/elastic-search.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), ElasticSearchModule],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
