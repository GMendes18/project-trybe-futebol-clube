import { TeamsType } from './ITeams';

export interface ITeamsModel {
  findAll(): Promise<TeamsType[]>,
  findById(id: TeamsType['id']): Promise<TeamsType | null>
}
