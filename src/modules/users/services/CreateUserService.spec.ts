import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to cretae a new user', async () => {
    const user = await createUser.execute({
      name: 'Diego',
      email: 'd@d.com',
      password: '1223566',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with same email', async () => {
    await createUser.execute({
      name: 'Diego',
      email: 'd@d.com',
      password: '1223566',
    });

    await expect(
      createUser.execute({
        name: 'Diego',
        email: 'd@d.com',
        password: '1223566',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
