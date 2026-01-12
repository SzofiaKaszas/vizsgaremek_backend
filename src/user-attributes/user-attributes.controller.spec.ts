import { Test, TestingModule } from '@nestjs/testing';
import { UserAttributesController } from './user-attributes.controller';
import { UserAttributesService } from './user-attributes.service';

describe('UserAttributesController', () => {
  let controller: UserAttributesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAttributesController],
      providers: [UserAttributesService],
    }).compile();

    controller = module.get<UserAttributesController>(UserAttributesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
