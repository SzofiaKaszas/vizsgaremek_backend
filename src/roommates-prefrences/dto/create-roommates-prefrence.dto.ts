import { IsNumber, IsString, Min, min } from "class-validator";

export class CreateRoommatesPrefrenceDto {
 
  /**
   * Minimum age of the preferred roommate.
   * @example 18
   */
  @IsNumber()
  minAge?: number;
  /**
   * Maximum age of the preferred roommate.
   * @example 30
   * 
   */
  @IsNumber()
  maxAge?: number;
 
  
  /**
   * Gender of the preferred roommate.
   * @example "female"
   */
  @IsString()
  gender?: string; //maybe enum later
  /**
   * Preferred language of the roommate.
   * @example "en"
   */
  @IsString()
  language?: string;
}
