import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { BcryptjsHashProvider } from '@/users/infrastructure/providers/hash-provider/bcryptjs-hash-provider';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { ConflictError } from '@/shared/domain/errors/conflict-error';
import { BadRequestError } from '@/shared/application/errors/bad-request-errror';
import { SignInUseCase } from '../../signIn.usecase';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { NotFoundError } from '@/shared/domain/errors/not-found-errror';
import { InvalidCredentialsError } from '@/shared/application/errors/invalid-credentials-errror';

describe('SigninUseCase unit tests', () => {
  let sut: SignInUseCase.UseCase;
  let repository: UserInMemoryRepository;
  let hashProvider: HashProvider;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    hashProvider = new BcryptjsHashProvider();
    sut = new SignInUseCase.UseCase(repository, hashProvider);
  });

  it('Should authenticate a user', async () => {
    const spyFindByEmail = jest.spyOn(repository, 'findByEmail');
    const hashPassword = await hashProvider.generateHash('1234');
    const entity = new UserEntity(
      UserDataBuilder({ email: 'a@a.com', password: hashPassword }),
    );
    repository.items = [entity];

    const result = await sut.execute({
      input: {
        email: entity.email,
        password: '1234',
      },
    });
    expect(spyFindByEmail).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(entity.toJSON());
  });

  it('Should throws error when email not provided', async () => {
    const props = UserDataBuilder({ email: null, password: '1234' });

    await expect(
      sut.execute({
        input: {
          email: '',
          password: props.password,
        },
      }),
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it('Should throws error when password not provided', async () => {
    const props = UserDataBuilder({ email: 'a@a.com', password: null });

    await expect(
      sut.execute({
        input: {
          email: props.email,
          password: '',
        },
      }),
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it('Should not be able to authenticate with wrong email', async () => {
    const hashPassword = await hashProvider.generateHash('1234');
    const entity = new UserEntity(
      UserDataBuilder({ email: 'a@a.com', password: hashPassword }),
    );
    repository.items = [entity];

    const props = UserDataBuilder({ email: 'a@a.com', password: 'fake' });

    await expect(
      sut.execute({ input: { email: props.email, password: props.password } }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
