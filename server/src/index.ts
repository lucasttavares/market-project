import express from 'express';
import 'dotenv/config';

import cors from 'cors';
import { adminRouter } from './routes/AdminRoutes';
import { clientRouter } from './routes/ClientRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/admin', adminRouter);
app.use('/client', clientRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server rodando na porta ${process.env.PORT}`);
});
