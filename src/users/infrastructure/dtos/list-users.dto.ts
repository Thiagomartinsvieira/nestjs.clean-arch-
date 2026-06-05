import { SortDirection } from '@/shared/domain/repositories/searchble-repository-contracts';
import { ListUsersUseCase } from '@/users/application/usecases/listusers.usecase';

export class listUsersDto implements ListUsersUseCase.Input {
  page?: number;
  perPage?: number;
  sort?: string;
  sortDir?: SortDirection;
  filter?: string;
}
