import { IsString, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export class CreateUserLoginDto {
  @IsNotEmpty()
  @IsNumber()
  UserLoginIdUser: number;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}