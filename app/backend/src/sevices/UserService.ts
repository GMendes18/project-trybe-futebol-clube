import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import IUsersModel from '../Interfaces/IUsersModel';
import { ServiceResponse, ServiceResponseError } from '../Interfaces/ServiceResponse';
import UsersModel from '../database/models/UsersModel';

type LoginResponse = {
  token: string
};

export default class UserService {
  private static readonly invalidCredentialsResponse: ServiceResponseError = {
    status: 'UNAUTHORIZED',
    data: {
      message: 'Invalid email or password',
    } };

  constructor(
    private usersModel: IUsersModel = new UsersModel(),
  ) {}

  public async login(email: string, password: string) : Promise<ServiceResponse<LoginResponse>> {
    const user = await this.usersModel.findByEmail(email);
    if (!user) return UserService.invalidCredentialsResponse;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return UserService.invalidCredentialsResponse;
    const payload = { sub: user.id, role: user.role, email: user.email };
    const secret = process.env.JWT_SECRET ?? 'secret_qualquer';
    const token = jwt.sign(payload, secret, { expiresIn: '1d' });
    return {
      status: 'SUCCESSFUL',
      data: {
        token,
      },
    };
  }
}
