import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../users.controller';
import { UserOutPut } from '@/users/application/dtos/user-output';
import { SignupUseCase } from '@/users/application/usecases/signup.usecase';
import { SignupDto } from '../../dtos/signup.dto';
import { SignInUseCase } from '@/users/application/usecases/signIn.usecase';
import { SigninDto } from '../../dtos/signinp.dto';

describe('UsersController', () => {
  let sut: UsersController;
  let id: string;
  let props: UserOutPut;

  beforeEach(() => {
    sut = new UsersController();
    props = {
      id: 'fake-id',
      name: 'John Doe',
      email: 'a@a.com',
      password: 'fake-password',
      createdAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a user', async () => {
    const output: SignupUseCase.Output = props;
    const mockSignupUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    };

    sut['signupUseCase'] = mockSignupUseCase as any;
    const input: SignupDto = {
      name: 'John Doe',
      email: 'a@a.com',
      password: 'fake-password',
    };

    const result = await sut.create(input);
    expect(output).toMatchObject(result);
    expect(mockSignupUseCase.execute).toHaveBeenCalledWith({ input });
  });

  it('should authenticate a user', async () => {
    const output: SignInUseCase.Output = props;
    const mockSignInUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    };

    sut['signinUseCase'] = mockSignInUseCase as any;
    const input: SigninDto = {
      email: 'a@a.com',
      password: 'fake-password',
    };

    const result = await sut.login(input);
    expect(output).toMatchObject(result);
    expect(mockSignInUseCase.execute).toHaveBeenCalledWith({ input });
  });
});
