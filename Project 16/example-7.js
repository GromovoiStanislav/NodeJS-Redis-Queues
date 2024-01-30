import 'dotenv/config';
import Bull from 'bull';

//const queue = new Bull('my-queue', process.env.REDIS_URL);
// or:
const queue = new Bull('my-queue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    user: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    db: 0,
  },
});

await queue.addBulk([
  { data: { foo: 'bar 1' }, opts: { jobId: 'boo' } },
  { data: { foo: 'bar 2' }, opts: { jobId: 'foofighter' } },
  { data: { foo: 'bar 3' }, opts: { jobId: 'foof' } },
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
  })
  .on('removed', async (jobid) => {
    console.log(`Job ${jobid} successfully removed`);
  });

//////////////// process ////////////////////////

queue.process(async (job) => {
  console.log(job.data);
  return 'OK';
});

setTimeout(() => queue.close(), 10000);

setTimeout(() => {
  //Will remove jobs with ids such as: "boo", "foofighter", etc.
  queue.removeJobs('?oo*').then(function () {
    console.log('done removing jobs');
  });
}, 5000);
