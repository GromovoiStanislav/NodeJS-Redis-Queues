//// Named jobs

import Bull from 'bull';

const queue = new Bull('transcoderQueue');

queue.on('completed', (job, result) => {
  console.log(
    `Job ${job.id} completed! Result: ${result}, Returnvalue: ${job.returnvalue}`
  );
  // job.remove();
});

// Jobs producer
await queue.add('image', { input: 'myimagefile' });
await queue.add('audio', { input: 'myaudiofile' });
await queue.add('video', { input: 'myvideofile' });

// Worker
queue.process('image', async (job) => {
  console.log('image', job.data);
  return 'OK';
});

queue.process('audio', async (job) => {
  console.log('audio', job.data);
  return 'OK';
});

queue.process('video', async (job) => {
  console.log('video', job.data);
  return 'OK';
});
