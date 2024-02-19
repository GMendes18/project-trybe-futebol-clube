import IMatch from './IMatch';

export default interface IMatchModel {
  findByProgress(progress: boolean):Promise<IMatch[]>,
  findAll(): Promise<IMatch[]>,
  finishMatch(id: number): Promise<void>,
  updateMatch(id: number, homeTeamGoals:number, awayTeamGoals: number): Promise<string>
}
