import { uuid } from 'uuidv4';

import IUsersTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import AppError from '@shared/errors/AppError';
import UserToken from '../../infra/typeorm/entities/UserToken';

class FakeUsersTokenRepository implements IUsersTokenRepository {
  private usersToken: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.usersToken.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.usersToken.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }
}

export default FakeUsersTokenRepository;
