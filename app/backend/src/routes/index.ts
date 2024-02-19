import { Router } from 'express';
import teamsRouter from './team.routes';
import usersRouter from './user.routes';
import mathcesRouter from './matches.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', mathcesRouter);

export default router;
