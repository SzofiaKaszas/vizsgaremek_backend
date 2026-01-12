import { PartialType } from '@nestjs/mapped-types';
import { CreateHouseListingDto } from './create-house-listing.dto';

export class UpdateHouseListingDto extends PartialType(CreateHouseListingDto) {}
