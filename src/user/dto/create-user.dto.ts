import { IsBoolean, IsEmail, IsInt, IsOptional, IsPhoneNumber, IsPositive, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  @IsEmail() //validate email format
  connectionEmail: string; //contactemail
  @IsString()
  @IsPhoneNumber() //validate phone number format, not sure if it works for all countries
  phoneNumber: string;

  @IsOptional()
  @IsString()
  userBio?: string;
  @IsOptional()
  @IsInt()
  @IsPositive() //age must be positive
  age?: number;
  @IsOptional()
  @IsString()
  gender?: string; //maybe enum later
  @IsOptional()
  @IsString()
  language?: string;
  @IsOptional()
  @IsString()
  occupation?: string;

  @IsBoolean()
  hasHouse: boolean;
  @IsBoolean()
  lookingForPeople: boolean;
  //@IsBoolean()
  //lookingForHouse: boolean;
}
