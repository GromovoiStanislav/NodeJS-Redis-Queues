import 'dotenv/config';
import Queue from 'bee-queue';

const queue = new Queue('example', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    user: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    db: 0,
    options: {},
  },
  removeOnSuccess: true,
  removeOnFailure: false,
  autoConnect: false,
});

await queue
  .connect()
  .then(async (isRunning) => {
    console.log('isRunning:', isRunning);
  })
  .catch((err) => console.log('unreadyable', err));

await queue.createJob({ x: 2, y: 3 }).save();

queue.on('job succeeded', (jobId, result) => {
  console.log(`Job ${jobId} succeeded with result: ${result}`);
});
queue.on('succeeded', (job, result) => {
  console.log(`Job ${job.id} succeeded with result: ${result}`);
});

queue.process(async (job) => {
  console.log(`Processing job ${job.id}`);
  return job.data.x + job.data.y;
  //or error
  //throw new Error('Ops..');
});

setTimeout(
  async () => await queue.close().then(() => console.log('Queue was closed')),
  3000
);

// setTimeout(
//   //Removes all Redis keys belonging to this queue
//   () => queue.destroy().then(() => console.log('Queue was destroyed')),
//   3000
// );
