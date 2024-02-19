import { Request, Response } from 'express';
import MatchesService from '../sevices/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const serviceResponse = await this.matchesService.getAllMatches();
      return res.status(200).json(serviceResponse.data);
    }
    const inProgressFilter = inProgress === 'true';
    const serviceResponse = await this.matchesService.findByProgress(inProgressFilter);
    res.status(200).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchesService.finishMatch(Number(id));
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatch(req: Request, res: Response) {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { status, data } = await this.matchesService.
  updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
  return res.status(mapStatusHTTP(status)).json(data);
  }

}
