import { Test, TestingModule } from '@nestjs/testing';
import { HouseAttributesService } from './house-attributes.service';

describe('HouseAttributesService', () => {
  let service: HouseAttributesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HouseAttributesService],
    }).compile();

    service = module.get<HouseAttributesService>(HouseAttributesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
