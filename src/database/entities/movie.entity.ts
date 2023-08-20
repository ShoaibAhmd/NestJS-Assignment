import { MovieRating } from 'src/database/entities/movie-rating.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  releaseDate: Date;

  @Column()
  ticketPrice: number;

  @Column()
  country: string;

  @Column()
  genre: string;

  @Column()
  photo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => MovieRating, (movieRating) => movieRating.movie)
  movieRating: MovieRating[];
}
