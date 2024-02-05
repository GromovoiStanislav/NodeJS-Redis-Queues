const Queue = require('bull');
const path = require('node:path');
const redisOptions = require('./redisConnectionOptions');

const queue = new Queue('queue1', redisOptions);

const processorPath = path.join(__dirname, 'processor.js');

// queue.process(10, async (job) => {
//   console.log(job.data);
//   return Promise.resolve('OK');
// });

queue.process(10, processorPath);
