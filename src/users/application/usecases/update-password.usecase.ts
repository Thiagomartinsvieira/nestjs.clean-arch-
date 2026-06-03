import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserOutPut, UserOutPutMapper } from '../dtos/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/useCases/use-case';
import { InvalidPaswordError } from '@/shared/application/errors/invalid-password-errror';
import { HashProvider } from '@/shared/application/providers/hash-provider';

export namespace UpdatePasswordUseCase {
  export type Input = {
    id: string;
    password: string;
    oldPassword: string;
  };

  export type Output = UserOutPut;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id);
      if (!input.password || !input.oldPassword) {
        throw new InvalidPaswordError('Password and old password are required');
      }

      const checkOldPassword = await this.hashProvider.compareHash(
        input.oldPassword,
        entity.password,
      );

      if (!checkOldPassword) {
        throw new InvalidPaswordError('Old password is incorrect');
      }

      const hashPassword = await this.hashProvider.generateHash(input.password);
      entity.updatePassword(hashPassword);

      await this.userRepository.update(entity);
      return UserOutPutMapper.toOutput(entity);
    }
  }
}
