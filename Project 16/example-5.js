import Bull from 'bull';

const queue = new Bull('my-queue');

const job = await queue.add(
  { foo: 'bar' },
  { attempts: 10, backoff: { type: 'exponential', delay: 1000 } }
);

console.log(`Job ${job.id} created`);

// Local events pass the job instance...
queue
  .on('active', async (job, jobPromise) => {
    console.log(`Job ${job.id} has started`);
    // A job has started. You can use `jobPromise.cancel()`` to abort it.
  })
  .on('completed', (job, result) => {
    console.log(
      `Job ${job.id} completed! Result: ${result}, Returnvalue: ${job.returnvalue}`
    );
  })
  .on('failed', (job, err) => {
    console.log(`Job ${job.id} failed with reason ${err}`);
  })
  .on('removed', async (jobid) => {
    console.log(`Job ${jobid} successfully removed`);
  });

//////////////// process ////////////////////////
queue.process(async (job) => {
  throw new Error('Some wrong');
});
