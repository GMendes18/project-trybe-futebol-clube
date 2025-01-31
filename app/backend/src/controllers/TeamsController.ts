import { Request, Response } from 'express';
import TeamsService from '../sevices/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamsService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAllTeams();
    res.status(200).json(serviceResponse.data);
  }

  public async getTeamsById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.teamService.getTeamById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }
}
