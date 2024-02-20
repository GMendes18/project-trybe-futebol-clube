import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchModel, { NewEntity } from '../Interfaces/IMatchModel';
import IMatch from '../Interfaces/IMatch';
import MatchesModel from '../database/models/MatchesModel';
import TeamsService from './TeamService';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchModel = new MatchesModel(),
    private teamService = new TeamsService(),
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

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<string>> {
    const result = await this.matchesModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: result };
  }

  public async create(data:NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = data;
    if (homeTeamId === awayTeamId) {
      return {
        status: 'INVALID',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const homeTeamExists = await this.teamService.getTeamById(Number(homeTeamId));
    const awayTeamExists = await this.teamService.getTeamById(Number(awayTeamId));
    if (homeTeamExists.status === 'NOT_FOUND' || awayTeamExists.status === 'NOT_FOUND') {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const newData = await this.matchesModel.create(data);
    return { status: 'CREATED', data: newData };
  }
}
