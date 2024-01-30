import Bull from 'bull';

const queue = new Bull('my-first-queue');

await queue.addBulk([
  { data: { foo: 'bar 1' }, opts: { removeOnComplete: true } },
  { data: { foo: 'bar 2' }, opts: { removeOnComplete: true } },
  { data: { foo: 'bar 3' }, opts: { removeOnComplete: true } },
]);

// Local events pass the job instance...
queue
  .on('active', async (job, jobPromise) => {
    console.log(`Job ${job.id} has started`);
  })
  .on('completed', (job, result) => {
    console.log(
      `Job ${job.id} completed! Result: ${result}, Returnvalue: ${job.returnvalue}`
    );
  })
  .on('failed', (job, err) => {
    console.log(`Job ${job.id} failed with reason ${err}`);
  });

//////////////// process ////////////////////////

queue.process(async (job) => {
  console.log(job.data);
  return 'OK';
});

setTimeout(() => queue.close(), 10000);

const failed = await queue.getFailed();
failed.forEach(async (job) => {
  await job.retry();
});
