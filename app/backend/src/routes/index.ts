import { Router } from 'express';
import teamsRouter from './team.routes';
import usersRouter from './user.routes';
import matchesRouter from './matches.routes';
import leaderBoardRouter from './leaderboard.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
