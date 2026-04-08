import { Entity } from '../entities/entity';
import { RepositoryInterface } from './repository-contracts';

export interface SearchbleRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(id: SearchInput): Promise<SearchOutput>;
}
