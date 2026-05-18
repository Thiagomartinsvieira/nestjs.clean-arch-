import { UserEntity } from '@/users/domain/entities/user.entity';

export type UserOutPut = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
};

export class UserOutPutMapper {
  static toOutput(entity: UserEntity): UserOutPut {
    return entity.toJSON();
  }
}
