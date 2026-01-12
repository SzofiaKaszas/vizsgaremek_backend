import { Test, TestingModule } from '@nestjs/testing';
import { HouseListingController } from './house-listing.controller';
import { HouseListingService } from './house-listing.service';

describe('HouseListingController', () => {
  let controller: HouseListingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseListingController],
      providers: [HouseListingService],
    }).compile();

    controller = module.get<HouseListingController>(HouseListingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
