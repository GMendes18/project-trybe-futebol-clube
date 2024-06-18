import { ServiceResponse } from "./ServiceResponse";

export default interface ILeaderBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export interface ILeaderboardService {
  newLeaderBoard(type: string): Promise<ServiceResponse<ILeaderBoard[]>>
}