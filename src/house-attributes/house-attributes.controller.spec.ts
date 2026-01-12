import { Test, TestingModule } from '@nestjs/testing';
import { HouseAttributesController } from './house-attributes.controller';
import { HouseAttributesService } from './house-attributes.service';

describe('HouseAttributesController', () => {
  let controller: HouseAttributesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseAttributesController],
      providers: [HouseAttributesService],
    }).compile();

    controller = module.get<HouseAttributesController>(HouseAttributesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
