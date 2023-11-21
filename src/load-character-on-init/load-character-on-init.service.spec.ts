import { Test, TestingModule } from '@nestjs/testing';
import { LoadCharacterOnInitService } from './load-character-on-init.service';

describe('LoadCharacterOnInitService', () => {
  let service: LoadCharacterOnInitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoadCharacterOnInitService],
    }).compile();

    service = module.get<LoadCharacterOnInitService>(LoadCharacterOnInitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
