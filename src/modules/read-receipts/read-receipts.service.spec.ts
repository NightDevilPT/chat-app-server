import { Test, TestingModule } from '@nestjs/testing';
import { ReadReceiptsService } from './read-receipts.service';

describe('ReadReceiptsService', () => {
  let service: ReadReceiptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadReceiptsService],
    }).compile();

    service = module.get<ReadReceiptsService>(ReadReceiptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
