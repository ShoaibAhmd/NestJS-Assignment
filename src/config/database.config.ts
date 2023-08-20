import { DataSourceOptions } from 'typeorm';

const db_server_username = process.env.DB_USERNAME ?? 'postgres';

const db_server_password = process.env.DB_PASSWORD ?? 'postgres';

const db_server_port = process.env.DB_PORT ?? 5432;

const db_server_host = process.env.DB_HOST ?? 'localhost';

const db_name = process.env.DB_NAME ?? 'filmsdb';

export const dbServerUrl = `postgres://${db_server_username}:${db_server_password}@${db_server_host}:${db_server_port}`;

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  url: `${dbServerUrl}/${db_name}`,
  synchronize: false,
  migrationsRun: false,
  logging: false, //'query', 'error', 'schema', 'warn', 'info', 'log'
  dropSchema: false,
};

export const tenancyDatabaseConfig = {
  ...databaseConfig,
  entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
};
