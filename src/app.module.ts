import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './features/movie/movie.module';
import { UserModule } from './features/user/user.module';
import { MovieRatingModule } from './features/movie-rating/movie-rating.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: false,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    MovieModule,
    UserModule,
    MovieRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
