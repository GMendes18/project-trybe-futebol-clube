import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import Validations from '../middlewares/loginValidation';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  Validations.handle,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

router.patch('/:id', Validations.handle, (req: Request, res: Response) => {
  matchesController.updateMatch(req, res);
});

export default router;
