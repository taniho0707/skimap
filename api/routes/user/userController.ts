import { Router } from 'express';
import { GetUsers } from './get_users';
import { AddUser } from './add_user';

const router = Router();

router.get('/list', (req, res, next) => {
  new GetUsers(req, res).main().catch(next);
});

router.post('/add', (req, res, next) => {
  new AddUser(req, res).main().catch(next);
});

export default router;
