import { Worker } from 'bullmq';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { CONNECTOR } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// const processorPath = path.join(__dirname, 'processor.js');
const processorPath = pathToFileURL(__dirname + '/processor.js');

const setUpWorker = () => {
  const worker = new Worker('JOBS', processorPath, {
    connection: CONNECTOR,
    autorun: true,
  });

  worker.on('active', (job) => {
    console.debug(`Processing job with id ${job.id}`);
  });

  worker.on('completed', (job, returnValue) => {
    console.debug(`Completed job with id ${job.id}`, returnValue);
  });

  worker.on('error', (failedReason) => {
    console.error(`Job encountered an error`, failedReason);
  });
};

export default setUpWorker;
