import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
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
