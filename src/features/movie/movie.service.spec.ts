import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { Repository } from 'typeorm';
import { ElasticSearchModule } from '../../elastic-search/elastic-search.module';
import { ConfigModule } from '@nestjs/config';

describe('MovieService', () => {
  let service: MovieService;

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
        MovieService,
        {
          provide: 'MovieRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
