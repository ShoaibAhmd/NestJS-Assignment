import { Client } from '@elastic/elasticsearch';
import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(private readonly elasticSearchService: ElasticsearchService) {}

  async createIndex(index: string) {
    const elasticIndex = await this.elasticSearchService.indices.exists({
      index,
    });

    if (elasticIndex) {
      this.logger.log('[INFO] Index already created');
      return;
    }
    await this.elasticSearchService.indices.create({ index });

    this.logger.log(`[INFO] Successfully created index with name ${index}`);
  }

  async indexDocument(index: string, data: Record<string, any>) {
    await this.elasticSearchService.index({
      index: index,
      document: data,
    });
  }

  async search(
    index: string,
    query: string,
    searchFields: string[],
    range?: Record<string, object>,
    filters?: Record<string, string>[],
  ) {
    const filtersArray =
      filters && filters.length
        ? filters.map((filter) => ({ match: filter }))
        : [];

    const result = await this.elasticSearchService.search({
      index: index,
      query: {
        bool: {
          filter: [
            range && { range: { ...range } },
            {
              multi_match: {
                query: query,
                fields: searchFields,
                fuzziness: 'AUTO',
              },
            },
            ...filtersArray,
          ],
        },
      },
    });

    return result;
  }
}
