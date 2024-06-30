import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetHistoryQuery } from '../impl/get-history.query';
import { HistoryRepository } from 'src/modules/history/entities/history.repository';
import { History } from 'src/modules/history/entities/history.entity';
import { GetEntityResponse } from 'src/interface';

@QueryHandler(GetHistoryQuery)
export class GetHistoryHandler implements IQueryHandler<GetHistoryQuery> {
  constructor(
    private readonly historyRepo: HistoryRepository,
  ) {}

  async execute(query: GetHistoryQuery): Promise<GetEntityResponse> {
    const page = Number(query.page);
    const limit = Number(query.limit);

    const [data, totalResults] = await this.historyRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(totalResults / limit);

    return {
      data,
      meta: {
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
        totalResults,
        totalPages,
      },
    };
  }
}
