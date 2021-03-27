import { Router } from 'express';
import Prefectures from './prefecture/prefectureController';

const router = Router();

router.use('/prefecture', Prefectures);

export default router;
