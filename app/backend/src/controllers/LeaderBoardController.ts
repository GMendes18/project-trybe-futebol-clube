import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderBoardService from '../sevices/LeaderBoardService';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) {}

  public async getAllLeaderBoards(req: Request, res: Response) {
    const { status, data } = await this.leaderBoardService.getAllLeaderBoards();
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async getAllLeaderBoardsAway(req: Request, res: Response) {
    const { status, data } = await this.leaderBoardService.getAllLeaderBoardsAway();
    res.status(mapStatusHTTP(status)).json(data);
  }
}
