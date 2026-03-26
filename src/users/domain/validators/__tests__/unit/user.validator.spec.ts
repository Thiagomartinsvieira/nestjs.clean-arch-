import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import {
  UserValidator,
  UserValidatorFactory,
  UserRules,
} from '../../user.validator';

let sut: UserValidator;

describe('User validator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create();
  });

  describe('Name field', () => {
    it('Invalidation cases for name field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({ ...UserDataBuilder({}), name: '' });
      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual(['name should not be empty']);

      isValid = sut.validate({
        ...UserDataBuilder({}),
        name: 10 as unknown as string,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        ...UserDataBuilder({}),
        name: 'a'.repeat(256),
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual([
        'name must be shorter than or equal to 255 characters',
      ]);
    });

    it('Validation cases for name field', () => {
      const props = UserDataBuilder({});
      const isValid = sut.validate(props);

      expect(isValid).toBeTruthy();
      expect(sut.errors).toBeNull(); // ou {} dependendo da implementação
      expect(sut.validatedData).toStrictEqual(new UserRules(props));
    });
  });
});
