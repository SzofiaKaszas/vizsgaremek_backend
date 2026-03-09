import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateRatingDto{
  @IsOptional()
  @IsString()
  ratingMessage :string

  @IsInt()
  @IsPositive()
  @Is
  ratingScore
}
