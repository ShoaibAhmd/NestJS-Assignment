import { Test, TestingModule } from '@nestjs/testing';
import { MovieRatingService } from './movie-rating.service';
import { Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { ElasticSearchModule } from '../../elastic-search/elastic-search.module';

describe('MovieRatingService', () => {
  let movieRatingService: MovieRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ElasticSearchModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.test.env',
        }),
      ],
      providers: [
        MovieRatingService,
        {
          provide: 'MovieRatingRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    movieRatingService = module.get<MovieRatingService>(MovieRatingService);
  });

  it('should be search movie ratings', async () => {
    // passing parameters which exist in current database
    // these values will be changed based on the created movie and movie-rating
    const result = await movieRatingService.search('new', 'rating:lte:4', [
      'movie.genre:drama',
    ]);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('hits');
  });
});
