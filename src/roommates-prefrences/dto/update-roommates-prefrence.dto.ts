import { PartialType } from '@nestjs/mapped-types';
import { CreateRoommatesPrefrenceDto } from './create-roommates-prefrence.dto';

export class UpdateRoommatesPrefrenceDto extends PartialType(CreateRoommatesPrefrenceDto) {}
