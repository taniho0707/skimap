import cors from 'cors'
import express from 'express';
import router from './routes/index';

const app = express();
const port = 3000;

app.use(cors())

app.use('/api', router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
