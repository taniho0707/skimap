import { Router } from 'express';
import { GetAreas } from './get_areas';
import { GetAreaById } from './get_area_by_id';
import { AddArea } from './add_area';
import { UpdateArea } from './update_area';
import { RemoveArea } from './remove_area';

const router = Router();

router.get('/list', (req, res, next) => {
  new GetAreas(req, res).main().catch(next);
});

router.get('/:id', (req, res, next) => {
  new GetAreaById(req, res).main().catch(next);
});

router.post('/add', (req, res, next) => {
  new AddArea(req, res).main().catch(next);
});

router.post('/update', (req, res, next) => {
  new UpdateArea(req, res).main().catch(next);
});

router.post('/remove', (req, res, next) => {
  new RemoveArea(req, res).main().catch(next);
});

export default router;
