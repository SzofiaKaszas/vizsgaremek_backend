import { Test, TestingModule } from '@nestjs/testing';
import { HouseListingService } from './house-listing.service';

describe('HouseListingService', () => {
  let service: HouseListingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HouseListingService],
    }).compile();

    service = module.get<HouseListingService>(HouseListingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
