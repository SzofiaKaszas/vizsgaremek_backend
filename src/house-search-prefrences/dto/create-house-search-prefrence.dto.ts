import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  FurnishingLevel,
  HeatingType,
  KitchenLevel,
  PropertyType,
} from 'generated/prisma/enums';

export class CreateHouseSearchPrefrenceDto {
  @IsNotEmpty()
  @IsNumber()
  houseSearchIdUser: number;

  @IsNumber()
  maxRent?: number;
  @IsNumber()
  minSquareMeters?: number;
  @IsNumber()
  minRooms?: number;
  @IsString()
  city?: string;
  @IsEnum(PropertyType)
  propertyType?: PropertyType;
  @IsEnum(HeatingType)
  heatingType?: HeatingType;
  @IsEnum(FurnishingLevel)
  furnishingLevel?: FurnishingLevel;
  @IsEnum(KitchenLevel)
  kitchenLevel?: KitchenLevel;
  @IsNumber()
  minBathrooms?: number;
}
