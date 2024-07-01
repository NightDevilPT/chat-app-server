import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BffService } from './bff.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetEntityResponse, RequestWithUser } from 'src/interface';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('bff')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('bff')
export class BffController {
  constructor(private readonly bffService: BffService) {}

  @Get('/get-history')
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async getHistory(
    @Query('page') page: number=1,
    @Query('limit') limit: number=10,
    @Req() req:RequestWithUser
  ): Promise<GetEntityResponse> {
    return this.bffService.getHistory(page, limit,req.user?.id);
  }
}
