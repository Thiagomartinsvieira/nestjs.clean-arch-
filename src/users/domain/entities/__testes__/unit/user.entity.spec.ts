import { UserEntity, UserProps } from '../../user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let sut: UserEntity;
  let validateSpy: jest.SpyInstance<void, [UserProps]>;

  beforeEach(() => {
    validateSpy = jest.spyOn(UserEntity, 'validate').mockImplementation();
    props = UserDataBuilder({});
    sut = new UserEntity(props);
  });

  afterEach(() => {
    validateSpy.mockRestore();
  });

  it('Constructor method', () => {
    expect(validateSpy).toHaveBeenCalled();
    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.email).toEqual(props.email);
    expect(sut.props.password).toEqual(props.password);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Getter of name field', () => {
    expect(sut.props.name).toBeDefined();
    expect(sut.props.name).toEqual(props.name);
    expect(typeof sut.props.name).toBe('string');
  });

  it('setter of name field', () => {
    sut['name'] = 'new name';
    expect(sut.props.name).toEqual('new name');
    expect(typeof sut.props.name).toBe('string');
  });

  it('Getter of email field', () => {
    expect(sut.props.email).toBeDefined();
    expect(sut.props.email).toEqual(props.email);
    expect(typeof sut.props.email).toBe('string');
  });

  it('Getter of password field', () => {
    expect(sut.props.password).toBeDefined();
    expect(sut.props.password).toEqual(props.password);
    expect(typeof sut.props.password).toBe('string');
  });

  it('Setter of password field', () => {
    sut['password'] = 'new password';
    expect(sut.props.password).toEqual('new password');
    expect(typeof sut.props.password).toBe('string');
  });

  it('Getter of password field', () => {
    expect(sut.props.password).toBeDefined();
    expect(sut.props.password).toEqual(props.password);
    expect(typeof sut.props.password).toBe('string');
  });

  it('Should update a user', () => {
    expect(validateSpy).toHaveBeenCalled();

    sut.updateName('new name');
    expect(sut.props.name).toEqual('new name');
  });

  it('Should update the passwordField', () => {
    expect(validateSpy).toHaveBeenCalled();
    sut.updatePassword('new password');
    expect(sut.props.password).toEqual('new password');
  });
});
