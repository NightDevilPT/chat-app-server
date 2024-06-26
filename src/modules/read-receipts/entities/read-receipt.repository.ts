import { EntityRepository, Repository } from 'typeorm';
import { ReadReceipt } from './read-receipt.entity';

@EntityRepository(ReadReceipt)
export class ReadReceiptRepository extends Repository<ReadReceipt> {}
