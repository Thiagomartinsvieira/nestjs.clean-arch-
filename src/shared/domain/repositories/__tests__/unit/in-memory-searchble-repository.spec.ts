import { Entity } from '@/shared/domain/entities/entity';
import { InMemorySearchableRepository } from '../../in-memory-searchble-repository';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchbleRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ['name'];

  // eslint-disable-next-line @typescript-eslint/require-await
  protected async applyFilter(
    items: StubEntity[],
    filter: string | null,
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter(item => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemorySearchbleRepository;

  beforeEach(() => {
    sut = new StubInMemorySearchbleRepository();
  });

  it('Should inserts a new entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 });
    await sut.insert(entity);
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON());
  });

  describe('applyFilter methodd', () => {
    it('', async () => {});
  });

  describe('applySort methodd', () => {});

  describe('applyPaginated methodd', () => {});

  describe('search methodd', () => {});
});
