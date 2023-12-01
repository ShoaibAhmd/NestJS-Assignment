// import { Module, OnModuleInit } from '@nestjs/common';
// import { SearchService } from './elastic-search.service';
// import { ElasticsearchModule } from '@nestjs/elasticsearch';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     ElasticsearchModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         node: configService.get('ELASTIC_SEARCH_HOST_PORT'),
//         maxRetries: 10,
//         requestTimeout: 60000,
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   providers: [SearchService],
//   exports: [SearchService],
// })
// export class ElasticSearchModule implements OnModuleInit {
//   constructor(private readonly searchService: SearchService) {}

//   async onModuleInit() {
//     await this.searchService.createIndex('movie');
//     await this.searchService.createIndex('movie-rating');
//   }
// }
