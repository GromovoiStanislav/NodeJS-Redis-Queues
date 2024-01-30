//// Rate Limiter

import Bull from 'bull';

// Limit queue to max 2 jobs per 1000 milliseconds.
const queue = new Bull('rateLimited', {
  limiter: {
    max: 2,
    duration: 1000,
  },
});
//When a queue hits the rate limit, requested jobs will join the delayed queue.

queue
  .on('active', async (job, jobPromise) => {
    console.log(`Job ${job.id} has started`);
    // A job has started. You can use `jobPromise.cancel()`` to abort it.
  })
  .on('completed', (job, result) => {
    console.log(
      `Job ${job.id} completed! Result: ${result}, Returnvalue: ${job.returnvalue}`
    );
    job.remove();
  })
  .on('waiting', (jobId) => {
    console.log(`Job ${jobId} is waiting to be processed`);
  })
  .on('drained', () => {
    console.log('drained');
  })
  .on('removed', async (jobid) => {
    console.log(`Job ${jobid} successfully removed`);
  });

// Jobs producer
await queue.add({ input: '1' });
await queue.add({ input: '2' });
await queue.add({ input: '3' });
await queue.add({ input: '4' });
await queue.add({ input: '5' });

// Worker
queue.process(async (job) => {
  console.log(job.data);
  return 'OK';
});
