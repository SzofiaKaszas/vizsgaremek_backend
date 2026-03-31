import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Max, Min, min } from "class-validator";
import { Language,UserPrefGender } from "generated/prisma/enums";

export class CreateRoommatesPrefrenceDto {
 
  /**
   * Minimum age of the preferred roommate.
   * @example 18
   */
  @IsNumber()
  @IsOptional()
  @IsInt()
  @Min(18)
  minAge?: number;
  /**
   * Maximum age of the preferred roommate.
   * @example 30
   * 
   */
  @IsNumber()
  @IsOptional()
  @IsInt()
  @Max(100)
  maxAge?: number;
 
  
  /**
   * Gender of the preferred roommate.
   * @example "female"
   */
  @IsString()
  @IsOptional()
  @IsEnum(UserPrefGender)
  gender?: UserPrefGender; //maybe enum later
  /**
   * Preferred language of the roommate.
   * @example "en"
  */
  @IsOptional()
  @IsEnum(Language)
  @IsString()
  language?: Language;
}
