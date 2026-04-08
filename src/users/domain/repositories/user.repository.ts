import { UserEntity } from '../entities/user.entity';
import { SearchbleRepositoryInterface } from '@/shared/domain/repositories/searchble-repository-contracts';

export interface UserRepository extends SearchbleRepositoryInterface<
  UserEntity,
  any,
  any
> {
  findByEmail(email: string): Promise<UserEntity>;
  emailExists(email: string): Promise<void>;
}
