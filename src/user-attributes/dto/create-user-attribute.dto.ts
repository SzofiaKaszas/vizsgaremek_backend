import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserAttributeDto {
  @IsNotEmpty()
  @IsString()
  attributeName: string;
}
