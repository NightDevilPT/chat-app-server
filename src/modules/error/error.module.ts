import { Module } from '@nestjs/common';
import { AppErrorService } from './error.service';

@Module({
  providers: [AppErrorService],
  exports: [AppErrorService],
})
export class ErrorModule {}
