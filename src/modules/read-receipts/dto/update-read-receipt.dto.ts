import { PartialType } from '@nestjs/mapped-types';
import { CreateReadReceiptDto } from './create-read-receipt.dto';

export class UpdateReadReceiptDto extends PartialType(CreateReadReceiptDto) {}
