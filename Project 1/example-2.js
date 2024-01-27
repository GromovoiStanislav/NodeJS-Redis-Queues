import Queue from 'bee-queue';

const addQueue = new Queue('addition');

addQueue.on('ready', () => {
  console.log('queue now ready to start doing things');
});
addQueue.on('error', (err) => {
  console.log(`A queue error happened: ${err.message}`);
});
addQueue.on('succeeded', (job, result) => {
  console.log(`Job ${job.id} succeeded with result: ${result}`);
});
addQueue.on('retrying', (job, err) => {
  console.log(
    `Job ${job.id} failed with error ${err.message} but is being retried!`
  );
});
addQueue.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed with error ${err.message}`);
});
addQueue.on('stalled', (jobId) => {
  console.log(`Job ${jobId} stalled and will be reprocessed`);
});

/////////////// Create jobs ///////////////
const job = addQueue.createJob({ x: 3, y: 3 });
job
  .retries(4)
  .backoff('fixed', 1000)
  .save()
  .then((job) => {
    console.log(`Saved job ${job.id}`);
  })
  .catch((error) => console.log(error));

job.on('progress', (progress) => {
  console.log(`Job ${job.id} reported progress: ${progress}%`);
});

// const errors = await addQueue.saveAll([
//   addQueue
//     .createJob({ x: 3, y: 4 })
//     .timeout(100)
//     .retries(2),
//   addQueue.createJob({ x: 4, y: 5 }),
// ]);
// .then((errors) => {
//   console.log(errors);
//   // The errors value is a Map associating Jobs with Errors. This will often be an empty Map.
// });
//errors.forEach((error) => console.log(error));

//////////// Process jobs ///////////////
// addQueue.process(async (job, done) => {
//   console.log(
//     `Processing job ${job.id}, received: {x:${job.data.x}, y:${job.data.y}}`
//   );

//   // do something quick;
//   job.reportProgress(10);
//   // do something bigger;
//   job.reportProgress;
//   // do finalize step;

//   // do the result
//   return done(null, job.data.x + job.data.y);
//   // or error
//   //return done(new Error('Ops..'));
// });

//or async !!!
addQueue.process(async (job) => {
  console.log(
    `Processing job ${job.id}, received: {x:${job.data.x}, y:${job.data.y}}`
  );

  await doSomethingQuick();
  job.reportProgress(10);
  await doSomethingBigger();
  job.reportProgress(50);
  await doFinalizeStep();

  // do the result
  //return job.data.x + job.data.y;
  // or error
  throw new Error('Ops..');
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function doSomethingQuick() {
  await sleep(100);
  return 'OK';
}

async function doSomethingBigger() {
  await sleep(1000);
  return 'OK';
}

async function doFinalizeStep() {
  await sleep(10);
  return 'OK';
}
