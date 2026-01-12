import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateHouseListingDto {
  @IsNotEmpty()
  @IsNumber()
  //@IsPositive()
  houseIdUser: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsNumber()
  rent: number; //originally float

  @IsNotEmpty()
  @IsString()
  propertyType: string; //enum

  @IsNumber()
  whichFloor?: number;

  @IsNotEmpty()
  @IsNumber()
  numberOfRooms: number;

  @IsNotEmpty()
  @IsNumber()
  squareMeter: number; // originally float

  @IsNotEmpty()
  @IsString()
  heatingType: string; //enum

  @IsNotEmpty()
  @IsString()
  furnishingLevel: string; //enum

  @IsNotEmpty()
  @IsString()
  kitchenLevel: string; //enum

  @IsNotEmpty()
  @IsNumber()
  bathrooms: number;

  @IsNotEmpty()
  @IsBoolean()
  airConditioner: boolean;
}
