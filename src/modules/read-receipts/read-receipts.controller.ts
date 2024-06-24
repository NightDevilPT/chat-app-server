import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReadReceiptsService } from './read-receipts.service';
import { CreateReadReceiptDto } from './dto/create-read-receipt.dto';
import { UpdateReadReceiptDto } from './dto/update-read-receipt.dto';

@Controller('read-receipts')
export class ReadReceiptsController {
  constructor(private readonly readReceiptsService: ReadReceiptsService) {}

  @Post()
  create(@Body() createReadReceiptDto: CreateReadReceiptDto) {
    return this.readReceiptsService.create(createReadReceiptDto);
  }

  @Get()
  findAll() {
    return this.readReceiptsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.readReceiptsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReadReceiptDto: UpdateReadReceiptDto) {
    return this.readReceiptsService.update(+id, updateReadReceiptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readReceiptsService.remove(+id);
  }
}
