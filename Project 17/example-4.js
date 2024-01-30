import 'dotenv/config';
import { Queue, Worker, QueueEvents, Job } from 'bullmq';

const connection = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  user: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
};

const queue = new Queue('Paint', { connection });

const job = await queue.add(
  'cars',
  {
    color: 'blue',
  },
  { attempts: 5, backoff: { type: 'exponential', delay: 1000 } }
);
console.log(`Job ${job.id} created`);

const worker = new Worker(
  'Paint',
  async (job) => {
    throw new Error('Some wrong');
  },
  { connection }
);

const queueEvents = new QueueEvents('Paint', { connection });

queueEvents.on('waiting', (e) => {
  console.log(`Job ${e.jobId} is now wating; previous status was ${e.prev}`);
});

queueEvents.on('active', (e) => {
  console.log(`Job ${e.jobId} is now active; previous status was ${e.prev}`);
});

queueEvents.on('completed', async (e) => {
  console.log(`Job ${e.jobId} completed ${e.returnvalue}`);

  {
    const job = await Job.fromId(queue, e.jobId);
    console.log(`Job ${job.id} completed with result: ${job.returnvalue}`);
    //await job.remove();
  }
  {
    const job = await queue.getJob(e.jobId);
    console.log(`Job ${job.id} completed with result: ${job.returnvalue}`);
    await job.remove();
  }
});

queueEvents.on('failed', (e) => {
  console.log(`Job ${e.jobId} failed ${e.failedReason}`);
});

queueEvents.on('progress', ({ jobId, data }, timestamp) => {
  console.log(`Job ${jobId} reported progress ${data} at ${timestamp}`);
});

queueEvents.on('removed', (e) => {
  console.log(`Job ${e.jobId} removed; previous status was ${e.prev}`);
});
