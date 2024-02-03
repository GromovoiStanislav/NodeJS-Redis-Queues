import { Queue } from 'bullmq';
import { CONNECTOR, DEFAULT_REMOVE_CONFIG } from './config.js';
import setUpWorker from './worker.js';

const myQueue = new Queue('JOBS', {
  connection: CONNECTOR,
});
myQueue.setMaxListeners(myQueue.getMaxListeners() + 100);

setUpWorker();

const addJobToQueue = async (data) => {
  return myQueue.add(data.jobName, data, DEFAULT_REMOVE_CONFIG);
};

export default addJobToQueue;
