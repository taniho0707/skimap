import { Router } from 'express';
import Prefectures from './prefecture/prefectureController';
import User from './user/userController';
import Area from './area/areaController';

const router = Router();

router.use('/prefecture', Prefectures);
router.use('/user', User);
router.use('/area', Area);

export default router;
