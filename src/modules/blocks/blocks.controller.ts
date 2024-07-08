import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RequestWithUser } from 'src/interface';

@ApiTags('blocks')
@Controller('blocks')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  create(@Body() createBlockDto: CreateBlockDto, @Req() req: RequestWithUser) {
    return this.blocksService.create(createBlockDto, req.user.id);
  }
}
