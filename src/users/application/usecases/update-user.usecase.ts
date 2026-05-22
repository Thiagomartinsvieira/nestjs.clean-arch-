import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserOutPut, UserOutPutMapper } from '../dtos/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/useCases/use-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-errror';

export namespace UpdateUserUseCase {
  export type Input = {
    id: string;
    name: string;
  };

  export type Output = UserOutPut;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.name) {
        throw new BadRequestError('Name is required');
      }
      const entity = await this.userRepository.findById(input.id);
      entity.updateName(input.name);
      await this.userRepository.update(entity);
      return UserOutPutMapper.toOutput(entity);
    }
  }
}
