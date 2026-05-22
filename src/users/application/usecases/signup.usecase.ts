import { UserRepository } from '@/users/domain/repositories/user.repository';
import { BadRequestError } from '../../../shared/application/errors/bad-request-errror';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { UserOutPut, UserOutPutMapper } from '../dtos/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/useCases/use-case';

export namespace SignupUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = UserOutPut;

  export class UseCase implements DefaultUseCase<{ input: Input }, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}

    async execute({ input }: { input: Input }): Promise<Output> {
      const { name, email, password } = input;

      if (!name || !email || !password) {
        throw new BadRequestError('Name, email and password are required');
      }

      await this.userRepository.emailExists(email);

      const hashPassword = await this.hashProvider.generateHash(password);

      const entity = new UserEntity(
        Object.assign(input, { password: hashPassword }),
      );

      await this.userRepository.insert(entity);

      return UserOutPutMapper.toOutput(entity);
    }
  }
}
