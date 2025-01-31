import { Request, Router, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getAllLeaderBoards(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.getAllLeaderBoardsAway(req, res),
);

export default router;
