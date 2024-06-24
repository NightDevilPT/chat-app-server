import { Test, TestingModule } from '@nestjs/testing';
import { ReadReceiptsController } from './read-receipts.controller';
import { ReadReceiptsService } from './read-receipts.service';

describe('ReadReceiptsController', () => {
  let controller: ReadReceiptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReadReceiptsController],
      providers: [ReadReceiptsService],
    }).compile();

    controller = module.get<ReadReceiptsController>(ReadReceiptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
