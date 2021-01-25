import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;

let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'd@d.com',
      password: '123456',
    });

    const user1 = await fakeUsersRepository.create({
      name: 'Lucas',
      email: 'b@d.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Maicon',
      email: 'a@d.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
