import { Test, TestingModule } from '@nestjs/testing';
import { CalculateCharacterStatsService } from './calculate-character-stats.service';

describe('CalculateCharacterStatsService', () => {
  let service: CalculateCharacterStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculateCharacterStatsService],
    }).compile();

    service = module.get<CalculateCharacterStatsService>(CalculateCharacterStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
