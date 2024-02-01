import 'dotenv/config';
import { Queue } from 'bullmq';

const redisConfiguration = {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    user: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
  },
};

const myQueue = new Queue('emailSchedule', redisConfiguration);

const emailSchedule = async (email, message, delay) => {
  await myQueue.add('email', { email, message }, { delay });
};

emailSchedule('foo@bar.com', 'Hello World!', 5000); // The email will be available for consumption after 5 seconds.
