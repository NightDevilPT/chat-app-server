import { Injectable } from '@nestjs/common';
import { CreateReadReceiptDto } from './dto/create-read-receipt.dto';
import { UpdateReadReceiptDto } from './dto/update-read-receipt.dto';

@Injectable()
export class ReadReceiptsService {
  create(createReadReceiptDto: CreateReadReceiptDto) {
    return 'This action adds a new readReceipt';
  }

  findAll() {
    return `This action returns all readReceipts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} readReceipt`;
  }

  update(id: number, updateReadReceiptDto: UpdateReadReceiptDto) {
    return `This action updates a #${id} readReceipt`;
  }

  remove(id: number) {
    return `This action removes a #${id} readReceipt`;
  }
}
