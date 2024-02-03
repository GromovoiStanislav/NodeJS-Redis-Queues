import express, { json } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import addJobToQueue from './bullmq/queue.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(json());

const csvFilePath = path.join(__dirname, './employment_indicators.csv');

app.post('/', async (req, res) => {
  const { userName } = req.body;
  const data = { jobName: 'csvJob', userName, csvFilePath };
  const job = await addJobToQueue(data);

  return res.status(201).json({ jobId: job.id });
});

app.listen(PORT, async function onListen() {
  console.log(`Server is up and running on port ${PORT}`);
});
