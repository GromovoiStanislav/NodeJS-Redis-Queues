import Queue from 'bee-queue';
const addQueue = new Queue('addition');

const job = addQueue.createJob({ x: 2, y: 3 });
job
  .timeout(3000)
  .retries(2)
  .save()
  .then((job) => {
    console.log('job.id:', job.id);
  });

job.on('progress', (progress) => {
  console.log(
    `Job ${job.id} reported progress: page ${progress.page} / ${progress.totalPages}`
  );
});

job.on('succeeded', (result) => {
  console.log(`Received result for job ${job.id}: ${result}`);
});

const jobsErrors = await addQueue.saveAll([
  addQueue.createJob({ x: 3, y: 4 }),
  addQueue.createJob({ x: 4, y: 5 }),
]);
// .then((errors) => {
//   console.log(errors);
//   // The errors value is a Map associating Jobs with Errors. This will often be an empty Map.
// });
jobsErrors.forEach((jobError) => console.log(jobError));

// Process jobs from as many servers or processes as you like
// addQueue.process((job, done) => {
//   console.log(`Processing job ${job.id}`);
//   // do some work
//   job.reportProgress({ page: 3, totalPages: 11 });
//   // do more work
//   job.reportProgress({ page: 9, totalPages: 11 });
//   // do the rest
//   return done(null, job.data.x + job.data.y);
// });
//or
addQueue.process(async (job) => {
  console.log(`Processing job ${job.id}`);
  // do some work
  job.reportProgress({ page: 3, totalPages: 11 });
  // do more work
  job.reportProgress({ page: 9, totalPages: 11 });
  // do the rest
  return job.data.x + job.data.y;
});
