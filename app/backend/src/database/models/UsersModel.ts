import SequelizeUser from './SequelizeUsers';
import IUsersModel from '../../Interfaces/IUsersModel';
import { IUser } from '../../Interfaces/IUsers';

export default class UsersModel implements IUsersModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
