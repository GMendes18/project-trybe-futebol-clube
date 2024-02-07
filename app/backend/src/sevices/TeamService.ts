import { ServiceResponse } from "../Interfaces/ServiceResponse";
import { TeamsType } from "../Interfaces/ITeams";
import { ITeamsModel } from "../Interfaces/ITeamsModel";
import TeamsModel from "../database/models/TeamsModel";

export default class TeamsService {
    constructor(
        private teamsModel: ITeamsModel = new TeamsModel(),
      ) { }

  public async getAllTeams(): Promise<ServiceResponse<TeamsType[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<TeamsType>> {
    const team = await this.teamsModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}