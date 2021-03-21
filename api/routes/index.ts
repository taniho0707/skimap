import Express from 'express';
import tests from './tests/testsController';

const router = Express.Router();

router.use('/tests', tests);

export default router;
