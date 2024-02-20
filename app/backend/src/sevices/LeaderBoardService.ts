import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import { getTotalDraws, getTotalGames, getGoalsFavor, getGoalsOwn,
  getTotalLosses, getTotalPoints, getTotalVictories,
} from '../utils/leaderboardfunctions';
// import ILeaderBoard from "../Interfaces/ILeaderBoard";
// import { ServiceResponse } from "../Interfaces/ServiceResponse";

export default class LeaderBoardService {
  constructor(
    private matchModel = new MatchesModel(),
    private teamModel = new TeamsModel(),
  ) {}

  public async getAllLeaderBoards() {
    const allMatches = await this.matchModel.findByProgress(false);
    const allTeams = await this.teamModel.findAll();
    const leaderboard = allTeams.map((team) => ({
      name: team.teamName,
      totalPoints: getTotalPoints(team.id, allMatches),
      totalGames: getTotalGames(team.id, allMatches),
      totalVictories: getTotalVictories(team.id, allMatches),
      totalDraws: getTotalDraws(team.id, allMatches),
      totalLosses: getTotalLosses(team.id, allMatches),
      goalsFavor: getGoalsFavor(team.id, allMatches),
      goalsOwn: getGoalsOwn(team.id, allMatches),
    }));
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
