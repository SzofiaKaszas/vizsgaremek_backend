import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoommatesPrefrenceDto {
  @IsNotEmpty()
  @IsNumber()
  roommatesPrefrencesIdUser: number;

  @IsNumber()
  minAge?: number;
  @IsNumber()
  maxAge?: number;
  @IsString()
  gender?: string; //maybe enum later
  @IsString()
  language?: string;
}
