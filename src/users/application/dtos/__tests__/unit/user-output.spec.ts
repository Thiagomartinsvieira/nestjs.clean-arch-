import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { UserOutPutMapper } from '../../user-output';

describe('UserOutputMapper unit tests', () => {
  it('Should convert a user in output', () => {
    const entity = new UserEntity(UserDataBuilder({}));
    const spyToJson = jest.spyOn(entity, 'toJSON');
    const sut = UserOutPutMapper.toOutput(entity);

    expect(spyToJson).toHaveBeenCalled();
    expect(sut).toStrictEqual(entity.toJSON());
  });
});
