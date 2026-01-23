import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber() //validate phone number format, not sure if it works for all countries
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

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
  @IsOptional()
  @IsString()
  @IsEmail() //validate email format
  connectionEmail?: string; //contactemail

  @IsNotEmpty()
  @IsBoolean()
  hasHouse: boolean;
  @IsNotEmpty()
  @IsBoolean()
  lookingForPeople: boolean;
  @IsNotEmpty()
  @IsBoolean()
  lookingForHouse: boolean;
}
