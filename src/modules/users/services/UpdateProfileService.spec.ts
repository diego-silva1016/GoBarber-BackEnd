import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'd@d.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jonas',
      email: 'a@a.com',
    });

    expect(updatedUser.name).toBe('Jonas');
    expect(updatedUser.email).toBe('a@a.com');
  });

  it('should not be able to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Diego',
      email: 'd@d.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jonas',
        email: 'd@d.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'd@d.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jonas',
      email: 'a@a.com',
      old_password: '123456',
      password: '123',
    });

    expect(updatedUser.password).toBe('123');
  });

  it('should not be able to update the password if the user does not inform the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'd@d.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jonas',
        email: 'a@a.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'd@d.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jonas',
        email: 'a@a.com',
        old_password: 'wrong',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile with-non existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Diego',
        email: 'a@a.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
