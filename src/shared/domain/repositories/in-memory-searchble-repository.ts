import { Entity } from '../entities/entity';
import { InMemoryRepository } from './in-memory-repository';
import {
  SearchableRepositoryInterface,
  SearchParams,
  SearchResult,
} from './searchble-repository-contracts';

export abstract class InMemorySearchbleRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  async search(props: SearchParams): Promise<SearchResult<E, any>> {
    throw new Error('Method not implemented.');
  }

  protected abstract applyFilter(
    items: E[],
    filter: string | null,
  ): Promise<E[]>;

  protected async applySort(
    items: E[],
    sort: string | null,
    sorDir: string | null,
  ): Promise<E[]> {}

  protected async applyPaginate(
    items: E[],
    page: SearchParams['page'],
    perPage: SearchParams['perPage'],
  ): Promise<E[]> {}
}
