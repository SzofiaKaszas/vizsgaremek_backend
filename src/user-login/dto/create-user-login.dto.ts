import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserLoginDto {
  @IsNotEmpty()
  @IsNumber()
  userLoginIdUser: number;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  username: string;
}
