import { Test, TestingModule } from '@nestjs/testing';
import { RoommatesPrefrencesController } from './roommates-prefrences.controller';
import { RoommatesPrefrencesService } from './roommates-prefrences.service';

describe('RoommatesPrefrencesController', () => {
  let controller: RoommatesPrefrencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoommatesPrefrencesController],
      providers: [RoommatesPrefrencesService],
    }).compile();

    controller = module.get<RoommatesPrefrencesController>(RoommatesPrefrencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
