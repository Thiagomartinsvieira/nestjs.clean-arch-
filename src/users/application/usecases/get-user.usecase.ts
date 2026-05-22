import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserOutPut, UserOutPutMapper } from '../dtos/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/useCases/use-case';

export namespace GetUserUseCase {
  export type Input = {
    id: string;
  };

  export type Output = UserOutPut;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id);
      return UserOutPutMapper.toOutput(entity);
    }
  }
}
