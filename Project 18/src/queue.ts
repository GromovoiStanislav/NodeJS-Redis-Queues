import { Queue, Job } from 'bullmq';
import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USER,
  REDIS_PASSWORD,
} from './config.constants.js';
import { setUpWorker } from './worker.js';

export const myQueue = new Queue('my-queue', {
  connection: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    username: REDIS_USER,
    password: REDIS_PASSWORD,
  },
});

const DEFAULT_REMOVE_CONFIG = {
  removeOnComplete: {
    age: 3600,
  },
  removeOnFail: {
    age: 24 * 3600,
  },
};

export async function addJobToQueue<T>(data: T): Promise<Job<T>> {
  return myQueue.add('job', data, DEFAULT_REMOVE_CONFIG);
}

setUpWorker();
