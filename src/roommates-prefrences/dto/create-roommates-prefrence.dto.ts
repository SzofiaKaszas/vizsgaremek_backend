import { IsNumber, IsString } from "class-validator";

export class CreateRoommatesPrefrenceDto {
 

  @IsNumber()
  minAge?: number;
  @IsNumber()
  maxAge?: number;
  @IsString()
  gender?: string; //maybe enum later
  @IsString()
  language?: string;
}
