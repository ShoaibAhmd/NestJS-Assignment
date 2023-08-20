import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiResponse } from 'src/utils/api-response';
import { JwtAuthGuard } from '../user/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    await this.movieService.create(createMovieDto);

    return new ApiResponse(200, 'Successfully created movie rating.', null);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }
}
