import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetHistoryQuery } from './queries/impl/get-history.query';
import { GetEntityResponse } from 'src/interface';

@Injectable()
export class BffService {
  constructor(private readonly queryBus: QueryBus) {}

  async getHistory(
    page: number,
    limit: number,
    userId: string,
  ): Promise<GetEntityResponse> {
    const query = new GetHistoryQuery(page, limit, userId);
    return this.queryBus.execute(query);
  }
}
