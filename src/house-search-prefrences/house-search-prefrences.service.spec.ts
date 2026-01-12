import { Test, TestingModule } from '@nestjs/testing';
import { HouseSearchPrefrencesService } from './house-search-prefrences.service';

describe('HouseSearchPrefrencesService', () => {
  let service: HouseSearchPrefrencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HouseSearchPrefrencesService],
    }).compile();

    service = module.get<HouseSearchPrefrencesService>(HouseSearchPrefrencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
