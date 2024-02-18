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

router.get(
  '/role',
  Validations.handle,
  (req: Request, res: Response) => UsersController.getToken(req, res),
);

export default router;
