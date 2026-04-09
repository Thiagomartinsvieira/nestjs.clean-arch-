import { Entity } from '../entities/entity';
import { RepositoryInterface } from './repository-contracts';

export type SortDirection = 'asc' | 'desc';

export type SearchProps<Filter = string> = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDir?: SortDirection | null;
  filter?: Filter | null;
};

export class SearchParams {
  protected _page = 1;
  protected _perPage = 15;
  protected _sort: string | null = null;
  protected _sortDir: SortDirection | null = null;
  protected _filter: string | null = null;

  constructor(props: SearchProps = {}) {
    this.page = props.page;
    this.perPage = props.perPage;
    this.sort = props.sort;
    this.sortDir = props.sortDir;
    this.filter = props.filter;
  }

  get page() {
    return this._page;
  }

  private set page(value: number | null | undefined) {
    let _page = Number(value);
    if (Number.isNaN(_page) || _page <= 0 || !Number.isInteger(_page)) {
      _page = 1;
    }
    this._page = _page;
  }

  get perPage() {
    return this._perPage;
  }

  private set perPage(value: number | null | undefined) {
    let _perPage =
      value === (true as any) || value === undefined || value === null
        ? this._perPage
        : +value;

    if (
      Number.isNaN(_perPage) ||
      _perPage <= 0 ||
      parseInt(_perPage as any) !== _perPage
    ) {
      _perPage = this._perPage;
    }

    this._perPage = _perPage;
  }

  private set sort(value: string | null | undefined) {
    this._sort =
      value === null || value === undefined || value === '' ? null : `${value}`;
  }

  get sortDir() {
    return this._sortDir;
  }

  private set sortDir(value: SortDirection | null | undefined) {
    if (!this.sort) {
      this._sortDir = null;
      return;
    }
    const dir = `${value}`.toLowerCase();
    this._sortDir = dir !== 'asc' && dir !== 'desc' ? 'desc' : dir;
  }

  get filter() {
    return this._filter;
  }

  private set filter(value: string | null | undefined) {
    this._filter =
      value === null || value === undefined || value === '' ? null : `${value}`;
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(props: SearchParams): Promise<SearchOutput>;
}
