import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { MovieRatingService } from './movie-rating.service';
import { CreateMovieRatingDto } from './dto/create-movie-rating.dto';
import { ApiResponse } from '../../utils/api-response';
import { JwtAuthGuard } from '../user/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('movie-rating')
export class MovieRatingController {
  constructor(private readonly movieRatingService: MovieRatingService) {}

  @Post()
  async create(@Body() createMovieRatingDto: CreateMovieRatingDto) {
    await this.movieRatingService.create(createMovieRatingDto);

    return new ApiResponse(200, 'Successfully created movie rating.', null);
  }

  @Get('search')
  async search(
    @Query('query') query: string,
    @Query('range') range: string,
    @Query('filters') filters: string[],
  ) {
    return await this.movieRatingService.search(
      query,
      range,
      typeof filters === 'string' && [filters],
    );
  }
}
