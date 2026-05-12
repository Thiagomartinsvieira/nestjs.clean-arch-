import { BcryptjsHashProvider } from '../../bcryptjs-hash-provider';

describe('BcryptjsHashProvider unit tests', () => {
  let sut: BcryptjsHashProvider;

  beforeAll(() => {
    sut = new BcryptjsHashProvider();
  });

  it('Should return a encrypted password', async () => {
    const password = 'TestePassword123';
    const hash = await sut.generateHash(password);
    expect(hash).not.toBe(password);
  });

  it('Should return false or invalid password and hash comparison', async () => {
    const password = 'TestePassword123';
    const hash = await sut.generateHash(password);
    const result = await sut.compareHash('invalidPassword', hash);
    expect(result).toBe(false);
  });

  it('Should return true for valid password and hash comparison', async () => {
    const password = 'TestePassword123';
    const hash = await sut.generateHash(password);
    const result = await sut.compareHash(password, hash);
    expect(result).toBe(true);
  });
});
