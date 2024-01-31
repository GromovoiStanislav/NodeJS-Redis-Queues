import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { PORT } from './config.constants.js';
import { addJobToQueue } from './queue.js';

const app = express();
app.use(express.json());

app.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const job = await addJobToQueue(req.body);
  res.json({ jobId: job.id });
  return next();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
