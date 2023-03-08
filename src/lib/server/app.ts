import express from 'express';
import fileRouter from './router';

const app = express();

app.use(fileRouter);

app.use((req, res) => {
  res.sendStatus(404);
})

export default app;