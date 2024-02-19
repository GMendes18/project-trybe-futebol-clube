import IMatch from './IMatch';

export default interface IMatchModel {
  findByProgress(progress: boolean):Promise<IMatch[]>,
  findAll(): Promise<IMatch[]>,
  finishMatch(id: number): Promise<void>,
}
