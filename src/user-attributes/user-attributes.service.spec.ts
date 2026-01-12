import { Test, TestingModule } from '@nestjs/testing';
import { UserAttributesService } from './user-attributes.service';

describe('UserAttributesService', () => {
  let service: UserAttributesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAttributesService],
    }).compile();

    service = module.get<UserAttributesService>(UserAttributesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
