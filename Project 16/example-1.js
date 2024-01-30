import Bull from 'bull';

const queue = new Bull('my-first-queue');

const job = await queue.add({ foo: 'bar' });
//const job = await queue.add({ foo: 'bar' }, { removeOnComplete: true });
//const job = await queue.add({ foo: 'bar' }, { delay: 5000 });
//const job = await queue.add({ foo: 'bar' }, { lifo: true });
// const job = await queue.add(
//   { foo: 'bar' },
//   {
//     repeat: {
//       every: 1000,
//       limit: 5,
//     },
//   }
// );

// Repeat payment job once every day at 3:15 (am)
//const job = await queue.add({ foo: 'bar' }, { repeat: { cron: '15 3 * * *' } });

console.log(`Job ${job.id} created`);

// Local events pass the job instance...
queue
  .on('active', async (job, jobPromise) => {
    console.log(`Job ${job.id} has started`);
    // A job has started. You can use `jobPromise.cancel()`` to abort it.
  })
  .on('progress', (job, progress) => {
    console.log(`Job ${job.id} is ${progress}% ready!`);
  })
  .on('completed', (job, result) => {
    console.log(
      `Job ${job.id} completed! Result: ${result}, Returnvalue: ${job.returnvalue}`
    );
    //job.remove();
  })
  .on('failed', (job, err) => {
    console.log(`Job ${job.id} failed with reason ${err}`);
  })
  .on('removed', async (job) => {
    console.log(`Job ${job.id} successfully removed`);
  })
  .on('error', (error) => {
    console.log(error);
  })
  .on('waiting', (jobId) => {
    // A Job is waiting to be processed as soon as a worker is idling.
  })
  .on('stalled', (job) => {
    // A job has been marked as stalled. This is useful for debugging job
    // workers that crash or pause the event loop.
  })
  .on('paused', () => {
    // The queue has been paused.
  })
  .on('resumed', (job) => {
    // The queue has been resumed.
  })
  .on('cleaned', (jobs, type) => {
    // Old jobs have been cleaned from the queue. `jobs` is an array of cleaned
    // jobs, and `type` is the type of jobs cleaned.
  })
  .on('drained', () => {
    // Emitted every time the queue has processed all the waiting jobs (even if there can be some delayed jobs not yet processed)
  });

// Global events only pass the job ID:
queue.on('global:progress', (jobId, progress) => {
  console.log(`Job ${jobId} is ${progress}% ready!`);
});

queue.on('global:completed', (jobId, result) => {
  console.log(`Job ${jobId} completed! Result: ${result}`);
  queue.getJob(jobId).then((job) => {
    if (!!job) {
      //job.remove();
    }
  });
});

//////////////// process ////////////////////////

queue.process(async (job) => {
  //return doSomething(job.data);
  console.log(job.data);

  let progress = 0;
  for (let i = 0; i < 100; i++) {
    //await doSomething(job.data);
    progress += 1;
    job.progress(progress);
  }

  return 'OK';
  // or error:
  // throw new Error('Some wrong');
});

setTimeout(() => queue.close(), 10000);
