import { Job, Worker } from 'bullmq';
import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USER,
  REDIS_PASSWORD,
} from './config.constants.js';
import { jobProcessor } from './job-processor.js';

let worker: Worker;

export function setUpWorker(): void {
  worker = new Worker('my-queue', jobProcessor, {
    connection: {
      host: REDIS_HOST,
      port: REDIS_PORT,
      username: REDIS_USER,
      password: REDIS_PASSWORD,
    },
    autorun: true,
  });

  worker.on('completed', (job: Job, returnvalue: 'DONE') => {
    console.debug(`Completed job with id ${job.id}`, returnvalue);
  });

  worker.on('active', (job: Job<unknown>) => {
    console.debug(`Completed job with id ${job.id}`);
  });

  worker.on('error', (failedReason: Error) => {
    console.error(`Job encountered an error`, failedReason);
  });
}
