import { HouseListing, HouseSearchPrefrences } from 'generated/prisma/client';
import { BadRequestException } from '@nestjs/common';
import {calculateOutsidePreferencePercentage, isSoonerInList} from '../helperFunctions/helpers'


/*idHousePrefrences: number;
    houseSearchIdUser: number;
    maxRent: number | null;
    minSquareMeters: number | null;
    minRooms: number | null;
    city: string | null;
    propertyType: PropertyType | null;
    heatingType: HeatingType | null;
    furnishingLevel: FurnishingLevel | null;
    kitchenLevel: KitchenLevel | null;
    minBathrooms: number | null;*/
function houseScoringPercentage(
  preferenc: HouseSearchPrefrences,
  potentialHouseMatch: HouseListing
){
  if(!preferenc || !potentialHouseMatch){throw new BadRequestException}
  let score = 0;
  let max = 0;

  const W_RENT = 50
  const W_SQUARE_METERS = 30
  const W_ROOMS = 30
  const W_CITY = 50
  const W_PROPERTY_TYPE = 10
  const W_HEATING_TYPE = 10
  const W_FURNISHING_LEVEL = 10
  const W_KITCHEN_LEVEL = 10
  const W_BATHROOMS = 20
  
  max += W_RENT + W_SQUARE_METERS + W_ROOMS + W_CITY + W_PROPERTY_TYPE + W_HEATING_TYPE + W_FURNISHING_LEVEL + W_KITCHEN_LEVEL + W_BATHROOMS

  //Rent
  const rentNotMatchPartialScoreRangeMaxMultiplier = 1.5 //Used to multiplie

  //Size (Square Meters)
  const squareMeterNotMatchPartialScoreRangeMaxMultiplier = 1.5 //Used to devide

  //Number of rooms
  const roomsNotMatchPartialScoreRangeMaxMultiplier = 1.5 //Used to devide

  //Furnising level
  const furnishingLevelBetterThanPrefrencPenalty = 0.5 //Used to multiplie
  
  //Kitchen level
  const kitchenLevelBetterThanPrefrencPenalty = 0.5 //Used to multiplie

  //Number of bathrooms
  const bathroomsNotMatchPartialScoreRangeMaxMultiplier = 1.5 //Used to devide

  //Rent
  if(!preferenc.maxRent){
    score += W_RENT
  }
  else if(potentialHouseMatch.rent <= preferenc.maxRent){
    score += W_RENT
  }
  else if(potentialHouseMatch.rent > preferenc.maxRent){
    score += W_RENT*calculateOutsidePreferencePercentage(potentialHouseMatch.rent,preferenc.maxRent,preferenc.maxRent * rentNotMatchPartialScoreRangeMaxMultiplier)
  }

  //Size (Square Meters)
  if(!preferenc.minSquareMeters){
    score += W_SQUARE_METERS
  }else if(potentialHouseMatch.squareMeter >= preferenc.minSquareMeters){
    score += W_SQUARE_METERS
  }else if(potentialHouseMatch.squareMeter < preferenc.minSquareMeters){
    score += W_SQUARE_METERS * calculateOutsidePreferencePercentage(potentialHouseMatch.squareMeter, preferenc.minSquareMeters, preferenc.minSquareMeters / squareMeterNotMatchPartialScoreRangeMaxMultiplier)
  }

  //Rooms
  if(!preferenc.minRooms){
    score += W_ROOMS
  }else if(potentialHouseMatch.numberOfRooms >= preferenc.minRooms){
    score += W_ROOMS
  }else if(potentialHouseMatch.numberOfRooms < preferenc.minRooms){
    score += W_ROOMS * calculateOutsidePreferencePercentage(potentialHouseMatch.numberOfRooms, preferenc.minRooms, preferenc.minRooms / roomsNotMatchPartialScoreRangeMaxMultiplier)
  }

  //City
  if(!preferenc.city){
    score += W_CITY
  }else if(preferenc.city === potentialHouseMatch.city){
    score += W_CITY
  }

  //Property Type
  if(!preferenc.propertyType){
    score += W_PROPERTY_TYPE
  }else if(preferenc.propertyType === potentialHouseMatch.propertyType){
    score += W_PROPERTY_TYPE
  }

  //Heating Type
  if(!preferenc.heatingType){
    score += W_HEATING_TYPE
  }else if(preferenc.heatingType === potentialHouseMatch.heatingType){
    score += W_HEATING_TYPE
  }

  //Furnishing Level
  if(!preferenc.furnishingLevel){
    score += W_FURNISHING_LEVEL
  }else if(preferenc.furnishingLevel === potentialHouseMatch.furnishingLevel){
    score += W_FURNISHING_LEVEL
  }else{
    const FurnishingLevelOrderedList = ["full","partial","none"]
    if(isSoonerInList(FurnishingLevelOrderedList,potentialHouseMatch.furnishingLevel,preferenc.furnishingLevel)){
      score += W_FURNISHING_LEVEL * furnishingLevelBetterThanPrefrencPenalty
    }
  }

  //Kitchen Level
  if(!preferenc.kitchenLevel){
    score += W_KITCHEN_LEVEL
  }else if(preferenc.kitchenLevel === potentialHouseMatch.kitchenLevel){
    score += W_KITCHEN_LEVEL
  }else{
    const kitchenLevelOrderedList = ["full","partial","none"]
    if(isSoonerInList(kitchenLevelOrderedList,potentialHouseMatch.kitchenLevel,preferenc.kitchenLevel)){
      score += W_KITCHEN_LEVEL * kitchenLevelBetterThanPrefrencPenalty
    }
  }

  //Bathrooms
  if(!preferenc.minBathrooms){
    score += W_BATHROOMS
  }else if(potentialHouseMatch.bathrooms >= preferenc.minBathrooms){
    score += W_BATHROOMS
  }else if(potentialHouseMatch.bathrooms < preferenc.minBathrooms){
    score += W_BATHROOMS * calculateOutsidePreferencePercentage(potentialHouseMatch.bathrooms, preferenc.minBathrooms, preferenc.minBathrooms / bathroomsNotMatchPartialScoreRangeMaxMultiplier)
  }
  //
  //Calculate and return the final score as a percentage
  if (!max || max == 0 || !score) {
    return 0;
  }
  return Math.round((score / max) * 100);
}

export {houseScoringPercentage}


