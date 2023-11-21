import { Test, TestingModule } from '@nestjs/testing';
import { LoadJsonService } from './load-json.service';

describe('LoadJsonService', () => {
  let service: LoadJsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoadJsonService],
    }).compile();

    service = module.get<LoadJsonService>(LoadJsonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
