import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { adminRouter } from './routes/AdminRoutes';
import { clientRouter } from './routes/ClientRoutes';
import { companyRouter } from './routes/CompanyRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/admin', adminRouter);
app.use('/client', clientRouter);
app.use('/company', companyRouter);

app.use('/upload_file', express.static('upload_file'));

app.listen(process.env.PORT, () => {
  console.log(`Server rodando na porta ${process.env.PORT}`);
});
