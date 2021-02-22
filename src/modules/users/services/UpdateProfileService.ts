import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    const userUpdatedMail = await this.usersRepository.findByEmail(email);

    if (userUpdatedMail && userUpdatedMail.id !== user_id)
      throw new AppError('Email already used');

    user.name = name;
    user.email = email;

    if (password && !old_password)
      throw new AppError('You need to inform the old password.');

    if (password && old_password) {
      if (!(await this.hashProvider.compareHash(old_password, user.password)))
        throw new AppError('Old password does not match.');

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
