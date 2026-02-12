import { IsNotEmpty, IsNumber, /*IsPositive,*/ IsString } from "class-validator"

/**
 * Dto for creating a new record
 */
export class CreateUserTokenDto {
  /**
   * Id od the user who's token this is
   * @example 42
   */
  @IsNotEmpty()
  @IsNumber()
  userIdToken: number

  /**
   * The token assigned to the user
   * @example f8bf1a217dde79dad1219f11345ca5ef792d341e556b7c1cf11576274c9a9062
   */
  @IsNotEmpty()
  @IsString()
  token: string
}
