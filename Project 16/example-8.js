import 'dotenv/config';
import Bull from 'bull';

const queueA = new Bull('Server A', process.env.REDIS_URL);
const queueB = new Bull('Server B', process.env.REDIS_URL);

queueA.process(async (job) => {
  console.log('Received message', job.data.msg);
  queueB.add({ msg: 'World' });
});

queueB.process(async (job) => {
  console.log('Received message', job.data.msg);
});

queueA.add({ msg: 'Hello' });
