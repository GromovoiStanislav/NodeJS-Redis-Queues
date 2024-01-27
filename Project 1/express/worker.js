import Queue from 'bee-queue';

const queue = new Queue('express-example');

queue.on('ready', () => {
  console.log('processing jobs...');

  queue.process((job, done) => {
    console.log('processing job ' + job.id);
    setTimeout(() => {
      done(null, job.data.x + job.data.y);
    }, 10);
  });
});
