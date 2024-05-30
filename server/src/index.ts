import express from 'express';
import 'dotenv/config';

import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/admin');

app.listen(process.env.PORT, () => {
  console.log(`Server rodando na porta ${process.env.PORT}`);
});
