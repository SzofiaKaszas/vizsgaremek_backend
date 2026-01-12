import { PartialType } from '@nestjs/mapped-types';
import { CreateHouseSearchPrefrenceDto } from './create-house-search-prefrence.dto';

export class UpdateHouseSearchPrefrenceDto extends PartialType(CreateHouseSearchPrefrenceDto) {}
