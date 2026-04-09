import { SearchParams } from '../../searchble-repository-contracts';

describe('Searchble Repository unit tests', () => {
  describe('SeachParams tests', () => {
    it('page prop', () => {
      const sut = new SearchParams();
      expect(sut.page).toBe(1);

      const params = [
        { page: null, expected: 1 },
        { page: undefined, expected: 1 },
        { page: '', expected: 1 },
        { page: 'test', expected: 1 },
        { page: 0, expected: 1 },
        { page: -1, expected: 1 },
        { page: 5.5, expected: 1 },
        { page: true, expected: 1 },
        { page: false, expected: 1 },
        { page: {}, expected: 1 },
        { page: 1, expected: 1 },
        { page: 2, expected: 2 },
      ];

      params.forEach(i => {
        expect(
          new SearchParams({ page: i.page as number | undefined }).page,
        ).toBe(i.expected);
      });
    });

    it('perPage prop', () => {
      const sut = new SearchParams();
      expect(sut.perPage).toBe(15);

      const params = [
        { perPage: null, expected: 15 },
        { perPage: undefined, expected: 15 },
        { perPage: '', expected: 15 },
        { perPage: 'test', expected: 15 },
        { perPage: 0, expected: 15 },
        { perPage: -15, expected: 15 },
        { perPage: 5.5, expected: 15 },
        { perPage: true, expected: 15 },
        { perPage: false, expected: 15 },
        { perPage: {}, expected: 15 },
        { perPage: 1, expected: 1 },
        { perPage: 2, expected: 2 },
        { perPage: 25, expected: 25 },
      ];

      params.forEach(i => {
        expect(
          new SearchParams({ perPage: i.perPage as number | undefined })
            .perPage,
        ).toBe(i.expected);
      });
    });
  });
});
