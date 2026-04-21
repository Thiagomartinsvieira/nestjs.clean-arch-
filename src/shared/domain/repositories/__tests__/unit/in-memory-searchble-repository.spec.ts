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
    it('Should no filter items when filter param is null', async () => {
      const items = [new StubEntity({ name: 'test name', price: 50 })];
      const spyFilterMethod = jest.spyOn(items, 'filter');
      const itemsFiltered = await sut['applyFilter'](items, null);
      expect(itemsFiltered).toStrictEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });

    it('Should no filter using a filter param', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 50 }),
        new StubEntity({ name: 'TEST', price: 50 }),
        new StubEntity({ name: 'Fake', price: 50 }),
      ];
      const spyFilterMethod = jest.spyOn(items, 'filter');
      let itemsFiltered = await sut['applyFilter'](items, 'TEST');
      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);

      itemsFiltered = await sut['applyFilter'](items, 'test');
      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);

      itemsFiltered = await sut['applyFilter'](items, 'no-filter');
      expect(itemsFiltered).toHaveLength(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(3);
    });
  });

  describe('applySort methodd', () => {
    it('Should no sort items', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 50 }),
        new StubEntity({ name: 'a', price: 50 }),
      ];
      let itemsSorted = await sut['applySort'](items, null, null);
      expect(itemsSorted).toStrictEqual(items);

      itemsSorted = await sut['applySort'](items, 'price', 'asc');
      expect(itemsSorted).toStrictEqual(items);
    });

    it('Should sort items', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 50 }),
        new StubEntity({ name: 'a', price: 50 }),
        new StubEntity({ name: 'c', price: 50 }),
      ];
      let itemsSorted = await sut['applySort'](items, 'name', 'asc');
      expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);

      itemsSorted = await sut['applySort'](items, 'name', 'desc');
      expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]]);
    });
  });

  describe('applyPaginated methodd', () => {});

  describe('search methodd', () => {});
});
