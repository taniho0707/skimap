import { Router } from 'express';
import Prefectures from './prefecture/prefectureController';
import User from './user/userController';
import Area from './area/areaController';
import Gpslog from './gpslog/gpslogController';

const router = Router();

router.use('/prefecture', Prefectures);
router.use('/user', User);
router.use('/area', Area);
router.use('/gpslog', Gpslog);

export default router;
