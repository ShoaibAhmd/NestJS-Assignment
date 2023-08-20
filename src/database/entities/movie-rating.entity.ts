import { Movie } from '../../database/entities/movie.entity';
import { User } from '../../database/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MovieRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Movie, (movie) => movie.movieRating)
  movie: Movie;

  @ManyToOne(() => User, (user) => user.movieRating)
  user: User;
}
