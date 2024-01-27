import Queue from 'bee-queue';

const pingQueue = new Queue('ping');
const pongQueue = new Queue('pong');

pongQueue.process((job, done) => {
  console.log('Ping received back pong');
  // setTimeout(sendPing, 2000);
  done();
});

const sendPing = () => {
  pingQueue.createJob().save(() => {
    console.log('Ping sent ping');
  });
};

sendPing();
setTimeout(sendPing, 2000);