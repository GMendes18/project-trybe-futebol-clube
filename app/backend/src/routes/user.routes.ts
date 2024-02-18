import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UsersController';
import Validations from '../middlewares/loginValidation';

const usersController = new UsersController();

const router = Router();

router.post(
  '/',
  Validations.loginValidation,
  (req: Request, res: Response) => usersController.login(req, res),
);

export default router;
