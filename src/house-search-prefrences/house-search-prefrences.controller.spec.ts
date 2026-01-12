import { Test, TestingModule } from '@nestjs/testing';
import { HouseSearchPrefrencesController } from './house-search-prefrences.controller';
import { HouseSearchPrefrencesService } from './house-search-prefrences.service';

describe('HouseSearchPrefrencesController', () => {
  let controller: HouseSearchPrefrencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseSearchPrefrencesController],
      providers: [HouseSearchPrefrencesService],
    }).compile();

    controller = module.get<HouseSearchPrefrencesController>(HouseSearchPrefrencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
