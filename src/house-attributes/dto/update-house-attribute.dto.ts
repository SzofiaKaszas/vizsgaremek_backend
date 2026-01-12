import { PartialType } from '@nestjs/mapped-types';
import { CreateHouseAttributeDto } from './create-house-attribute.dto';

export class UpdateHouseAttributeDto extends PartialType(CreateHouseAttributeDto) {}
