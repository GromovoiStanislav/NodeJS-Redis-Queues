const express = require('express');
const path = require('node:path');
const addJobToQueue = require('./bullmq/queue');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

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
