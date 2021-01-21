import { getRepository, Repository } from 'typeorm';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import UserToken from '../entities/UserToken';

class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const findToken = await this.ormRepository.findOne({
      where: { token },
    });

    return findToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokenRepository;
