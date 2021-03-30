import cors from 'cors'
import express from 'express';
import router from './routes/index';

const app = express();
const port = 3000;

app.use(cors())

app.use('/api', router)

module.exports = app;

if (!module.parent) {
    app.listen(port, () => console.log(`skimap api listening on port ${port}!`));
}
