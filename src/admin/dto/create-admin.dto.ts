import {
  IsEmail,
  //IsInt,
  IsNotEmpty,
  //IsPositive,
  IsString,
  Matches,
} from 'class-validator';

export class CreateAdminDto {
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
  //@IsPhoneNumber() //validate phone number format, not sure if it works for all countries
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+?\d{1,3}[-\s\.]?\(?\d{2,3}\)?[-\s\.]?\d{3}[-\s\.]?\d{4,6}$/)
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
}
