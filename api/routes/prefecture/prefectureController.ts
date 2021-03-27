import { Router } from 'express';
import { GetPrefectures } from './get_prefectures';
import { GetPrefectureById } from './get_prefecture_by_id';

const router = Router();

router.get('/', (req, res, next) => {
  new GetPrefectures(req, res).main().catch(next);
});

router.get('/:prefecture_id', (req, res, next) => {
  new GetPrefectureById(req, res).main().catch(next);
});

export default router;
