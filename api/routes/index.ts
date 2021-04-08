import { Router } from 'express';
import Prefectures from './prefecture/prefectureController';
import User from './user/userController';

const router = Router();

router.use('/prefecture', Prefectures);
router.use('/user', User);

export default router;
