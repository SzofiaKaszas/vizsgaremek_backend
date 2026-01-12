import { Injectable } from '@nestjs/common';
import { CreateUserAttributeDto } from './dto/create-user-attribute.dto';
import { UpdateUserAttributeDto } from './dto/update-user-attribute.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserAttributesService {
  constructor(private readonly db: PrismaService) {}
  create(createUserAttributeDto: CreateUserAttributeDto) {
    // Create a new user attribute
    return this.db.userAttributes.create({
      data: createUserAttributeDto,
    });
  }

  // Get all user attributes
  findAll() {
    return this.db.userAttributes.findMany();
  }

  // Get a single user attribute record by its id
  findOne(id: number) {
    return this.db.userAttributes.findUnique({
      where: { idUserAttributes: id },
    });
  }

  // Update an existing user attribute record by its id
  update(id: number, updateUserAttributeDto: UpdateUserAttributeDto) {
    return this.db.userAttributes.update({
      where: { idUserAttributes: id },
      data: updateUserAttributeDto,
    });
  }

  // Remove a user attribute record by its id
  remove(id: number) {
    return this.db.userAttributes.delete({
      where: { idUserAttributes: id },
    });
  }
}
