import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsPositive, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail() //validate email format
  connectionEmail: string; //contactemail
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber() //validate phone number format, not sure if it works for all countries
  phoneNumber: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  userBio?: string;
  @IsNotEmpty()
  @IsOptional()
  @IsInt()
  @IsPositive() //age must be positive
  age?: number;
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  gender?: string; //maybe enum later
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  language?: string;
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  occupation?: string;

  @IsNotEmpty()
  @IsBoolean()
  hasHouse: boolean;
  @IsNotEmpty()
  @IsBoolean()
  lookingForPeople: boolean;
  //@IsNotEmpty()
  //@IsBoolean()
  //lookingForHouse: boolean;
}
