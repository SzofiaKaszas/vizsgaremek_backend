import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTokenDto } from './create-user-token.dto';

/**
 * DTO for updating user token
 */
export class UpdateUserTokenDto extends PartialType(CreateUserTokenDto) {}
