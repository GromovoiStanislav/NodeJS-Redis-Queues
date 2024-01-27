import Queue from 'bee-queue';

const queue = new Queue('addition');
queue
  .ready()
  .then(async (queue) => {
    console.log('isRunning:', queue.isRunning());
  })
  .catch((err) => console.log('unreadyable', err));

const counts = await queue.checkHealth();
console.log('job state counts:', counts);
// Output:
// job state counts: {
//   waiting: 0,
//   active: 0,
//   succeeded: 42,
//   failed: 0,
//   delayed: 0,
//   newestJob: 42
// }

queue.getJobs('failed', { size: 100 }).then((jobs) => {
  const jobIds = jobs.map((job) => job.id);
  console.log(`Job failed ids: ${jobIds.join(' ')}`);
});

queue.getJobs('waiting', { start: 0, end: 25 }).then((jobs) => {
  const jobIds = jobs.map((job) => job.id);
  console.log(`Job waiting ids: ${jobIds.join(' ')}`);
});

queue.getJobs('succeeded', { start: 0, end: 25 }).then((jobs) => {
  const jobIds = jobs.map((job) => job.id);
  console.log(`Job succeeded ids: ${jobIds.join(' ')}`);
});

queue.getJob(106).then((job) => {
  console.log(`Job ${job.id} has status ${job.status}`);
  job.remove().then(() => console.log('Job was removed'));
});

queue.removeJob(3).then(() => console.log('Job 3 was removed'));

process.on('uncaughtException', async () => {
  try {
    await queue.close();
  } catch (err) {
    console.error('bee-queue failed to shut down gracefully', err);
  }
  process.exit(1);
});

setTimeout(queue.close, 3000);
