import { Router } from 'express';
import { GetUsers } from './get_users';
import { AddUser } from './add_user';
import { UpdateUser } from './update_user';
import { RemoveUser } from './remove_user';

const router = Router();

router.get('/list', (req, res, next) => {
  new GetUsers(req, res).main().catch(next);
});

router.post('/add', (req, res, next) => {
  new AddUser(req, res).main().catch(next);
});

router.post('/update', (req, res, next) => {
  new UpdateUser(req, res).main().catch(next);
});

router.post('/remove', (req, res, next) => {
  new RemoveUser(req, res).main().catch(next);
});

export default router;
