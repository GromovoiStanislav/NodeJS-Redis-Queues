import Queue from 'bee-queue';

const pingQueue = new Queue('ping');
const pongQueue = new Queue('pong');

pingQueue.process((job, done) => {
  console.log('Pong received ping');

  pongQueue.createJob().save(() => {
    console.log('Pong sent back pong');
    done();
  });
});
