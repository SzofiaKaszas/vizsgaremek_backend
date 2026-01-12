import { IsNotEmpty, IsString } from "class-validator";

export class CreateHouseAttributeDto {
    @IsNotEmpty()
    @IsString()
    attributeName: string;
}
