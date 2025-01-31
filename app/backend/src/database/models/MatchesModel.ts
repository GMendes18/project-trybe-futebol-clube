import SequelizeMatches from './SequelizeMatches';
import IMatch from '../../Interfaces/IMatch';
import IMatchModel, { NewEntity } from '../../Interfaces/IMatchModel';
import SequelizeTeam from './SequelizeTeams';

export default class MatchesModel implements IMatchModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });
    return dbData;
  }

  async findByProgress(progress: boolean): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      where: { inProgress: progress },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });
    return dbData;
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<string> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return 'Updated';
  }

  async create(data: NewEntity<IMatch>): Promise<IMatch> {
    const dbData = await this.model.create({
      homeTeamId: data.homeTeamId,
      homeTeamGoals: data.homeTeamGoals,
      awayTeamId: data.awayTeamId,
      awayTeamGoals: data.awayTeamGoals,
      inProgress: true,
    });
    return dbData.dataValues;
  }
}
