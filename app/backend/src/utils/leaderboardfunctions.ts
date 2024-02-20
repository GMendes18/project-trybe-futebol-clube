import IMatch from '../Interfaces/IMatch';

function getTotalVictories(id: number, matches: IMatch[]) {
  const total = matches.filter((match) => id === match.homeTeamId
    && match.homeTeamGoals > match.awayTeamGoals).length;
  return total;
}

function getTotalDraws(id: number, matches: IMatch[]) {
  const total = matches.filter((match) => id === match.homeTeamId
    && match.homeTeamGoals === match.awayTeamGoals).length;
  return total;
}

function getTotalPoints(id: number, matches: IMatch[]) {
  return (getTotalVictories(id, matches) * 3) + getTotalDraws(id, matches);
}

function getTotalLosses(id: number, matches: IMatch[]) {
  const total = matches.filter((match) => id === match.homeTeamId
     && match.homeTeamGoals < match.awayTeamGoals).length;
  return total;
}

function getGoalsFavor(id: number, matches: IMatch[]) {
  const total = matches.reduce((acc, match) => {
    if (id === match.homeTeamId) {
      return acc + match.homeTeamGoals;
    } if (id === match.awayTeamId) {
      return acc + match.awayTeamGoals;
    }
    return acc;
  }, 0);
  return total;
}

function getGoalsOwn(id: number, matches: IMatch[]) {
  const total = matches.reduce((acc, match) => {
    if (id === match.homeTeamId) {
      return acc + match.awayTeamGoals;
    } if (id === match.awayTeamId) {
      return acc + match.homeTeamGoals;
    }
    return acc;
  }, 0);
  return total;
}

function getTotalGames(id: number, matches: IMatch[]) {
  const total = matches.filter((match) =>
    id === match.homeTeamId || id === match.awayTeamId).length;
  return total;
}

export {
  getGoalsFavor,
  getGoalsOwn,
  getTotalDraws,
  getTotalGames,
  getTotalLosses,
  getTotalPoints,
  getTotalVictories,
};
