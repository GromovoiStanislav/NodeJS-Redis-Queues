import { Queue, Worker, QueueEvents, Job } from 'bullmq';
import redisConnection from './redis-connection.js';

///////////// Queue ///////////////

const videoQueue = new Queue('video encoding', {
  connection: redisConnection,
});

// Add a job of type 'video' to the 'video encoding' queue
const job = await videoQueue.add(
  'transcode',
  {
    inputFile: 'video.mp4',
    outputFormat: 'mkv',
  },
  {
    delay: 3000, // 3 sec delay
    attempts: 5, // Retry 5 times
    backoff: {
      type: 'exponential',
      delay: 1000, // Initial 1 sec backoff
    },
    //repeat: { cron: '0 0 * * *' }, // Daily at midnight
    lifo: true,
    priority: 10,
    removeOnComplete: false,
    removeOnFail: false,
  }
);

// Job ID and Metadata
console.log('job.id:', job.id);
console.log('job.name:', job.name);
console.log('job.data:', job.data);
console.log('job.opts:', job.opts);
console.log('job.getState:', await job.getState()); // delayed

// // Add a job of type 'email' to the 'mailer' queue
// await mailerQueue.add('email', {
//   to: 'user@example.com',
//   subject: 'Welcome email',
// });

// // Add a job of type 'img' to the 'image' queue
// await imageQueue.add('resize', {
//   imageUrl: 'example.jpg',
//   width: 800,
//   height: 600,
// });

// listening Queue Events
videoQueue.on('paused', () => {
  console.log(`Queue paused`);
});

videoQueue.on('resumed', () => {
  console.log(`Queue resumed`);
});

// // Pausing Queues
// await videoQueue.pause();
// setTimeout(async () => await videoQueue.resume(), 10000);

///////////// Worker /////////

// Consuming Jobs
const worker = new Worker(
  'video encoding',
  async (job) => {
    console.log(`Process job ${job.id} ${job.name} ${job.opts.priority}`);
    await job.updateProgress(0);

    console.log('job.getState:', await job.getState()); // active

    try {
      // Process job
      //await sendEmail(job.data.to, job.data.subject);
      await job.updateProgress(50);
    } catch (err) {
      // Reject Promise on error
      throw err;
    }

    await job.updateProgress(1000);
    console.log(`Completed job ${job.id} ${job.name}`);
    return { result: 'OK' };
  },
  {
    connection: redisConnection,
    concurrency: 5, // limited max CPU core
    limiter: {
      // rate limit
      max: 10, // max of 10 jobs
      duration: 1000, // Per second
    },
  }
);

// listening Worker Events
worker.on('paused', () => {
  console.log(`Worker paused`);
});

worker.on('resumed', () => {
  console.log(`Worker resumed`);
});

worker.on('active', (job) => {
  console.log(`Active job with id ${job.id}`);
});

worker.on('completed', async (job, returnvalue) => {
  console.log(`Completed job with id ${job.id}`, returnvalue);
});

worker.on('progress', (job, data) => {
  console.log(`Job ${job.id} reported progress ${data}`);
});

worker.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed with ${err}`);
});

// // Pausing  Worker
await worker.pause();
setTimeout(() => worker.resume(), 10000);

///////////// QueueEvents /////////

const queueEvents = new QueueEvents('video encoding', {
  connection: redisConnection,
});

queueEvents.on('waiting', (e) => {
  console.log(`Job ${e.jobId} is now wating; previous status was ${e.prev}`);
});

queueEvents.on('active', (e) => {
  console.log(`Job ${e.jobId} is now active; previous status was ${e.prev}`);
});

queueEvents.on('completed', async (e) => {
  console.log(`Job ${e.jobId} completed`, e.returnvalue);

  {
    const job = await Job.fromId(videoQueue, e.jobId);
    console.log(`Job ${job.id} completed with result:`, job.returnvalue);
    console.log('job.getState:', await job.getState()); // completed
    //await job.remove();
  }
  {
    const job = await videoQueue.getJob(e.jobId);
    console.log(`Job ${job.id} completed with result:`, job.returnvalue);
    await job.remove();
  }
});

queueEvents.on('failed', (e) => {
  console.log(`Job ${e.jobId} failed ${e.failedReason}`);
});

queueEvents.on('progress', (e, timestamp) => {
  console.log(`Job ${e.jobId} reported progress ${e.data} at ${timestamp}`);
});

queueEvents.on('removed', (e) => {
  console.log(`Job ${e.jobId} removed; previous status was ${e.prev}`);
});
