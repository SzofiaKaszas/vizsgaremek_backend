import { IsDate, IsNotEmpty, IsNumber, /*IsPositive,*/ IsString } from "class-validator"

export class CreateUserTokenDto {
  @IsNotEmpty()
  @IsNumber()
  //@IsPositive()
  userIdToken: number

  @IsNotEmpty()
  @IsString()
  token: string
  @IsNotEmpty()
  @IsDate()
  expirationDate: Date
}
