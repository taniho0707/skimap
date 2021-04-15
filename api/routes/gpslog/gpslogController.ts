import { Router } from 'express';
import { AddGpslog } from './add_gpslog';
import { GetGpslog } from './get_gpslog';
import { GetGpslogById } from './get_gpslog_by_id';
import { RemoveGpslog } from './remove_gpslog';

import multer from 'multer';

const router = Router();

const upload = multer({ dest: './uploads/' });

router.get('/list', (req, res, next) => {
  new GetGpslog(req, res).main().catch(next);
});

router.get('/:id', (req, res, next) => {
  new GetGpslogById(req, res).main().catch(next);
});

router.post('/add', upload.single('file'), (req, res, next) => {
  new AddGpslog(req, res).main().catch(next);
});

router.post('/remove', (req, res, next) => {
  new RemoveGpslog(req, res).main().catch(next);
});

export default router;
