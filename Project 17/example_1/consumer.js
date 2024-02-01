import 'dotenv/config';
import { Worker } from 'bullmq';

const redisConfiguration = {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    user: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
  },
};

const sendEmail = (job) => {
  const { email, message } = job.data;
  console.log(`Message ${message} was sent to ${email}.`);
};

const worker = new Worker('emailSchedule', sendEmail, redisConfiguration);

worker.on('completed', (job) => {
  console.info(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.error(`${job.id} has failed with ${err.message}`);
});
