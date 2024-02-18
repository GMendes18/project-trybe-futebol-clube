import { IUser } from './IUsers';

export default interface IUsersModel {
  findByEmail(email: string) : Promise<IUser | null>
}
