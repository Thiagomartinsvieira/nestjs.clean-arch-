import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserInMemoryRepository } from '../../user-in-memory.repository';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { NotFoundError } from '@/shared/domain/errors/not-found-errror';
import { ConflictError } from '@/shared/domain/errors/conflict-error';

describe('UserInMemoryRepository unit tests', () => {
  let sut: UserInMemoryRepository;

  beforeEach(() => {
    sut = new UserInMemoryRepository();
  });

  it('Should throw error when not found - findByEmail method', async () => {
    await expect(sut.findByEmail('fake-email')).rejects.toThrow(
      new NotFoundError('Entity not found using email fake-email'),
    );
  });

  it('Should find a entity by email - findByEmail method', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    await sut.insert(entity);
    const result = await sut.findByEmail(entity.email);
    expect(entity.toJSON()).toStrictEqual(result.toJSON());
  });

  it('Should throw error when not found - emailExists method', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    await sut.insert(entity);
    await expect(sut.emailExists(entity.email)).rejects.toThrow(
      new ConflictError('Email address already used'),
    );
  });

  it('Should throw error when not found - emailExists method', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    await sut.insert(entity);
    await expect(sut.emailExists(entity.email)).rejects.toThrow(
      new ConflictError('Email address already used'),
    );
  });
  it('Should find a entity by email - emailExists method', async () => {
    expect.assertions(0);
    await sut.emailExists('fake-email');
  });

  it('Should no filter when filter object is null ', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    await sut.insert(entity);
    const result = await sut.findAll();
    const spyFilter = jest.spyOn(result, 'filter');
    const itemsFIltered = await sut['applyFilter'](result, null as any);
    expect(spyFilter).not.toHaveBeenCalled();
    expect(itemsFIltered).toStrictEqual(result);
  });

  it('Should filter name field using filter param ', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ name: 'test' })),
      new UserEntity(UserDataBuilder({ name: 'TEST' })),
      new UserEntity(UserDataBuilder({ name: 'fake' })),
    ];

    const spyFilter = jest.spyOn(items, 'filter');
    const itemsFIltered = await sut['applyFilter'](items, 'TEST');
    expect(spyFilter).toHaveBeenCalledTimes(1);
    expect(itemsFIltered).toStrictEqual([items[0], items[1]]);
  });

  it('Should sort by createdAt when sort param is null ', async () => {
    const createdAt = new Date();
    const items = [
      new UserEntity(UserDataBuilder({ name: 'test', createdAt })),
      new UserEntity(
        UserDataBuilder({
          name: 'TEST',
          createdAt: new Date(createdAt.getTime() + 1),
        }),
      ),
      new UserEntity(
        UserDataBuilder({
          name: 'fake',
          createdAt: new Date(createdAt.getTime() + 2),
        }),
      ),
    ];

    const itensSorted = await sut['applySort'](items, null, null);
    expect(itensSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it('Should sort bby name field ', async () => {
    const createdAt = new Date();
    const items = [
      new UserEntity(UserDataBuilder({ name: 'c' })),
      new UserEntity(
        UserDataBuilder({
          name: 'd',
        }),
      ),
      new UserEntity(
        UserDataBuilder({
          name: 'a',
        }),
      ),
    ];

    let itensSorted = await sut['applySort'](items, 'name', 'asc');
    expect(itensSorted).toStrictEqual([items[2], items[0], items[1]]);

    itensSorted = await sut['applySort'](items, 'name', null);
    expect(itensSorted).toStrictEqual([items[1], items[0], items[2]]);
  });
});
