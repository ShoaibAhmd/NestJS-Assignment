import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  releaseDate: Date;

  @IsNotEmpty()
  @IsNumber()
  ticketPrice: number;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsNotEmpty()
  @IsString()
  photo: string;
}
