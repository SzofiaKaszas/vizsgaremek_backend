import { PartialType } from '@nestjs/mapped-types';
import { CreateRoommatesPrefrenceDto } from './create-roommates-prefrence.dto';
/**
 * DTO for updating roommates prefrences, extends the CreateRoommatesPrefrenceDto and makes all fields optional
 */
export class UpdateRoommatesPrefrenceDto extends PartialType(CreateRoommatesPrefrenceDto) {}
