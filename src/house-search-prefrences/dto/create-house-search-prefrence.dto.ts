import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
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

  @IsOptional()
  @IsNumber()
  maxRent?: number;
  @IsOptional()
  @IsNumber()
  minSquareMeters?: number;
  @IsNumber()
  @IsOptional()
  minRooms?: number;
  @IsString()
  @IsOptional()
  city?: string;
  @IsEnum(PropertyType)
  @IsOptional()
  propertyType?: PropertyType;
  @IsEnum(HeatingType)
  @IsOptional()
  heatingType?: HeatingType;
  @IsEnum(FurnishingLevel)
  @IsOptional()
  furnishingLevel?: FurnishingLevel;
  @IsEnum(KitchenLevel)
  @IsOptional()
  kitchenLevel?: KitchenLevel;
  @IsNumber()
  @IsOptional()
  minBathrooms?: number;
}
