import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsEnum } from "class-validator";
import { FurnishingLevel, HeatingType, KitchenLevel, PropertyType } from "generated/prisma/enums";

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
  @IsEnum(PropertyType)
  propertyType: PropertyType; //enum

  @IsNumber()
  whichFloor?: number;

  @IsNotEmpty()
  @IsNumber()
  numberOfRooms: number;

  @IsNotEmpty()
  @IsNumber()
  squareMeter: number; // originally float

  @IsNotEmpty()
  @IsEnum(HeatingType)
  heatingType: HeatingType; //enum

  @IsNotEmpty()
  @IsEnum(FurnishingLevel)
  furnishingLevel: FurnishingLevel; //enum

  @IsNotEmpty()
  @IsEnum(KitchenLevel)
  kitchenLevel: KitchenLevel; //enum

  @IsNotEmpty()
  @IsNumber()
  bathrooms: number;

  @IsNotEmpty()
  @IsBoolean()
  airConditioner: boolean;
}