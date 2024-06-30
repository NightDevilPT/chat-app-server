import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BffService } from './bff.service';
import { ApiTags } from '@nestjs/swagger';
import { GetEntityResponse } from 'src/interface';

@ApiTags('bff')
@Controller('bff')
export class BffController {
  constructor(private readonly bffService: BffService) {}

  @Get('/get-history')
  async getHistory(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<GetEntityResponse> {
    return this.bffService.getHistory(page, limit);
  }
}
