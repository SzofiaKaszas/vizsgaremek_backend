import { PartialType } from "@nestjs/mapped-types";
import { IsInt, IsOptional, IsPositive, IsString, Min, Max } from "class-validator";

export class CreateRatingDto{
  @IsOptional()
  @IsString()
  ratingMessage :string

  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(5)
  ratingScore : number
}

export class UpdateRatingDto extends PartialType(CreateRatingDto) {}
