import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchModel from '../Interfaces/IMatchModel';
import IMatch from '../Interfaces/IMatch';
import MatchesModel from '../database/models/MatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchModel = new MatchesModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async findByProgress(progress: boolean): Promise<ServiceResponse<IMatch[]>> {
    const filteredMatches = await this.matchesModel.findByProgress(progress);
    return { status: 'SUCCESSFUL', data: filteredMatches };
  }

  public async finishMatch(id: number):Promise<ServiceResponse<{ message: 'Finished' }>> {
    await this.matchesModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
