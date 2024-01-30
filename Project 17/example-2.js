import 'dotenv/config';
import { Queue, Worker, QueueEvents, Job } from 'bullmq';

const connection = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  user: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
};

const queue = new Queue('Paint', { connection });

const name = 'jobName';
const opts = { removeOnComplete: true };
const jobs = await queue.addBulk([
  { name, data: { paint: 'car' }, opts },
  { name, data: { paint: 'house' }, opts },
  { name, data: { paint: 'boat' }, opts },
]);
console.log(`jobs.length ${jobs.length}`);

const worker = new Worker(
  'Paint',
  async (job) => {
    if (job.name === 'jobName') {
      console.log(job.id, job.data);
      console.log(`Job ${job.id} with data`, job.data, `processing..`);
    }
    return 'ok';
  },
  { connection }
);

const queueEvents = new QueueEvents('Paint', { connection });
queueEvents.on('completed', async (e) => {
  console.log(`Job ${e.jobId} completed ${e.returnvalue}`);
});
