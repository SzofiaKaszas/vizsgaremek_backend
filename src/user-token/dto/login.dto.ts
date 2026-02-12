import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Dto for a user who tries to login 
 */
export class LoginDto {
  /**
   * Email of the user 
   * @example user@gmail.com
   */
  @IsNotEmpty()
  @IsString()
  email: string;

  /**
   * Password of the user
   * @example Password123
   */
  @IsNotEmpty()
  @IsString()
  password: string;
}
