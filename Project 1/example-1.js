import Queue from 'bee-queue';

const addQueue = new Queue('addition');

const job = addQueue.createJob({ x: 2, y: 3 });
job
  .timeout(3000)
  .retries(2)
  .save()
  .then((job) => {
    console.log(`Saved job ${job.id}`);
  })
  .catch((error) => console.log(error));

job.on('progress', (progress) => {
  console.log(
    `Job ${job.id} reported progress: page ${progress.page} / ${progress.totalPages}`
  );
});

job.on('succeeded', (result) => {
  console.log(`Received result for job ${job.id}: ${result}`);
});

// Process jobs
// addQueue.process((job, done) => {
//   console.log(`Processing job ${job.id}`);
//   // do some work
//   job.reportProgress({ page: 3, totalPages: 11 });
//   // do more work
//   job.reportProgress({ page: 9, totalPages: 11 });
//   // do the reresultst
//   return done(null, job.data.x + job.data.y);
//  //or error
// return done(new Error('Ops..'));
// });
//or async !!!
addQueue.process(async (job) => {
  console.log(`Processing job ${job.id}`);
  // do some work
  job.reportProgress({ page: 3, totalPages: 11 });
  // do more work
  job.reportProgress({ page: 9, totalPages: 11 });
  // do the result
  return job.data.x + job.data.y;
  //or error
  //throw new Error('Ops..');
});
