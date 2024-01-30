import Bull from 'bull';

const queue = new Bull('my-first-queue');

console.log(await queue.getJobCounts());

console.log('completed:', await queue.getCompletedCount());
console.log('failed:', await queue.getFailedCount());
console.log('delayed:', await queue.getDelayedCount());
console.log('active:', await queue.getActiveCount());
console.log('waiting:', await queue.getWaitingCount());
console.log('paused:', await queue.getPausedCount());

console.log('get completed:', await queue.getCompleted());
console.log('get failed:', await queue.getFailed());
console.log('get jobs:', await queue.getJobs('failed'));

await queue.removeRepeatableByKey('__default__::::15 3 * * *');
await queue.removeRepeatable({ every: 1000 });
console.log('get repeatableJobs:', await queue.getRepeatableJobs());

const failed = await queue.getFailed();
failed.forEach(async (job) => {
  console.log(
    job.id,
    await job.getState(),
    job.attemptsMade,
    job.returnvalue,
    job.failedReason,
    job.finishedOn
  );
  await job.log('add some log');
  console.log(await queue.getJobLogs(job.id));
  await job.update({ foo: 'biz' });
});

setTimeout(() => queue.close(), 5000);

queue
  .on('removed', async (job) => {
    console.log(`Job ${job.id} successfully removed`);
  })
  .on('cleaned', (jobs, type) => {
    console.log('Jobs', jobs, 'have been cleaned from the queue', type);
    console.log('Cleaned %s %s jobs', jobs.length, type);
  });

//clean all jobs that failed over 10 seconds ago.
queue.clean(10000, 'failed');

//cleans all jobs that completed over 5 seconds ago.
queue.clean(5000);

//Drains a queue deleting all the input lists and associated jobs.
queue.empty();

//Will remove jobs with ids such as: "boo", "foofighter", etc.
queue.removeJobs('?oo*').then(function () {
  console.log('done removing jobs');
});
