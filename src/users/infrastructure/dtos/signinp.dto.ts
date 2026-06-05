import { SignInUseCase } from '@/users/application/usecases/signIn.usecase';

export class SigninDto implements SignInUseCase.Input {
  email!: string;
  password!: string;
}
