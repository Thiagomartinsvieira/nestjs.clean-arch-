import { UserRepository } from '@/users/domain/repositories/user.repository';
import { BadRequestError } from '../../../shared/application/errors/bad-request-errror';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { UserOutPut, UserOutPutMapper } from '../dtos/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/useCases/use-case';
import { InvalidCredentialsError } from '@/shared/application/errors/invalid-credentials-errror';

export namespace SignInUseCase {
  export type Input = {
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
      const { email, password } = input;

      if (!email || !password) {
        throw new BadRequestError('Email and password are required');
      }

      const entity = await this.userRepository.findByEmail(email);

      const hashPasswordMatches = await this.hashProvider.compareHash(
        password,
        entity.password,
      );

      if (!hashPasswordMatches) {
        throw new InvalidCredentialsError('Invalid credentials');
      }

      return UserOutPutMapper.toOutput(entity);
    }
  }
}
