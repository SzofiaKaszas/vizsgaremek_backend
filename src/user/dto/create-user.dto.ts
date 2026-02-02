import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  /**
   * First name of the user.
   * @example "John"
   */
  @IsNotEmpty()
  @IsString()
  firstName: string;

  /**
   * Last name of the user.
   * @example "Doe"
   */
  @IsNotEmpty()
  @IsString()
  lastName: string;

  /**
   * Phone number of the user. Store in E.164 format when possible.
   * @example "+1234567890"
   */
  @IsNotEmpty()
  @IsString()
  //@IsPhoneNumber() //validate phone number format, not sure if it works for all countries
  phoneNumber: string;

  /**
   * User password (hashed before storage on the server).
   * @example "StrongP@ssw0rd!"
   */
  @IsNotEmpty()
  @IsString()
  password: string;

  /**
   * Primary email address of the user.
   * @example "exampleemail@example.com"
   */
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  
  /**
   * Short biography or profile summary provided by the user.
   * @example "Student from Budapest, interested in shared housing."
   */
  @IsOptional()
  @IsString()
  userBio?: string;


  /**
   * Age of the user in years.
   * @example 25
   */
  @IsOptional()
  @IsInt()
  @IsPositive() //age must be positive
  age?: number;

  /**
   * Gender of the user.
   * @example "male"
   */
  @IsOptional()
  @IsString()
  gender?: string; //maybe enum later


  /**
   * Preferred language of the user.
   * @example "en"
   */
  @IsOptional()
  @IsString()
  language?: string;

  /**
   * User occupation or job title.
   * @example "Software engineer"
   */
  @IsOptional()
  @IsString()
  occupation?: string;

  /**
   * Optional alternate contact email for connections.
   * @example "friendcontact@example.com"
   */
  @IsOptional()
  @IsString()
  @IsEmail() //validate email format
  connectionEmail?: string; //contactemail

  /**
   * Whether the user currently has a house/listing.
   * @example false
   */
  @IsNotEmpty()
  @IsBoolean()
  hasHouse: boolean;

  /**
   * Whether the user is looking for people to join their household.
   * @example false
   */
  @IsNotEmpty()
  @IsBoolean()
  lookingForPeople: boolean;
  
  /**
   * Whether the user is looking for a house to rent or share.
   * @example true
   */
  @IsNotEmpty()
  @IsBoolean()
  lookingForHouse: boolean;

  @IsNotEmpty()
  @IsString()
  role: string
}
