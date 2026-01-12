import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAttributeDto } from './create-user-attribute.dto';

export class UpdateUserAttributeDto extends PartialType(CreateUserAttributeDto) {}
