import SequelizeTeam from './SequelizeTeams';
import { TeamsType } from '../../Interfaces/ITeams';
import { ITeamsModel } from '../../Interfaces/ITeamsModel';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeam;

  async findAll(): Promise<TeamsType[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: TeamsType['id']): Promise<TeamsType | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { teamName }: TeamsType = dbData;
    return { id, teamName };
  }
}
