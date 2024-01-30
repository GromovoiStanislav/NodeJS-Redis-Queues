import 'dotenv/config';
import { Queue, Worker, QueueEvents, Job } from 'bullmq';

const connection = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  user: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
};

////////////////////////////////////////
const worker = new Worker(
  'Paint',
  async (job) => {
    return 'ok';
  },
  { connection }
);

///////////////////////////////////////////////
const queueEvents = new QueueEvents('Paint', { connection });
queueEvents.on('completed', async (e) => {
  console.log(`Job ${e.jobId} completed ${e.returnvalue}`);
});
queueEvents.on('removed', (e) => {
  console.log(`Job ${e.jobId} removed; previous status was ${e.prev}`);
});

////////////////////////////////////////////
const queue = new Queue('Paint', { connection });

console.log('Job counts', await queue.getJobCounts());
console.log('Completed count', await queue.getCompletedCount());
console.log('Failed count', await queue.getFailedCount());

const failed = await queue.getFailed();
failed.forEach(async (job) => {
  console.log(job.id, job.failedReason);
  await job.retry();
});

const completed = await queue.getCompleted();
completed.forEach(async (job) => {
  console.log(job.id, job.returnvalue);
  await job.remove();
});
