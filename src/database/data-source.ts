import { DataSource, DataSourceOptions } from 'typeorm';
import { tenancyDatabaseConfig } from '../config/database.config';

export const ORMConfig = new DataSource({
  ...tenancyDatabaseConfig,
} as DataSourceOptions);
