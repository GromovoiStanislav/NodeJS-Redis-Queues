const Queue = require('bull');
const redisOptions = require('./redisConnectionOptions');

let queue = new Queue('queue1', redisOptions);

// queue.add(
//   { data: 'job data' },
//   {
//     attempts: 2,
//     removeOnComplete: true,
//     removeOnFail: true,
//     repeat: { every: 2500 },
//   }
// );

// Instead of `repeat`
setInterval(() => {
  console.log(queue.client.status);
  if (queue.client.status === 'ready') {
    // Check for ready, otherwise it will crash
    queue.add(
      { data: 'job data' },
      {
        attempts: 2,
        removeOnComplete: true,
        removeOnFail: true,
      }
    );
  }
}, 2500);

queue.on('global:completed', (jobId) => {
  console.log(`Job ${jobId} completed`);
});
