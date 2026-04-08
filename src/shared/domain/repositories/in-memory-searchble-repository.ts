import { Entity } from '../entities/entity';
import { InMemoryRepository } from './in-memory-repository';
import { SearchbleRepositoryInterface } from './searchble-repository-contracts';

export abstract class InMemorySearchbleRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchbleRepositoryInterface<E, any, any>
{
  search(id: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
