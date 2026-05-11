import { UserRepository } from '@/users/domain/repositories/user.repository';
import { BadRequestError } from '../errors/bad-request-errror';
import { UserEntity } from '@/users/domain/entities/user.entity';

export namespace SignupUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
  };

  export class useCase {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute({ input: Input }): Promise<Output> {
      const { name, email, password } = Input;

      if (!name || !email || !password) {
        throw new BadRequestError('Name, email and password are required');
      }

      await this.userRepository.emailExists(email);

      const entity = new UserEntity(Input);

      await this.userRepository.insert(entity);

      return entity.toJSON();
    }
  }
}
