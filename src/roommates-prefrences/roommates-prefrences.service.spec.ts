import { Test, TestingModule } from '@nestjs/testing';
import { RoommatesPrefrencesService } from './roommates-prefrences.service';

describe('RoommatesPrefrencesService', () => {
  let service: RoommatesPrefrencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoommatesPrefrencesService],
    }).compile();

    service = module.get<RoommatesPrefrencesService>(RoommatesPrefrencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
