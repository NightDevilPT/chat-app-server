import { Module } from '@nestjs/common';
import { ReadReceiptsService } from './read-receipts.service';
import { ReadReceiptsController } from './read-receipts.controller';

@Module({
  controllers: [ReadReceiptsController],
  providers: [ReadReceiptsService],
})
export class ReadReceiptsModule {}
