import { Worker } from 'bullmq';
import { REDIS_HOST, REDIS_PORT, REDIS_USER, REDIS_PASSWORD, } from './config.constants.js';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { myQueue } from './queue.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let worker;
//const processorPath = path.join(__dirname, 'job-processor.js');
const processorPath = pathToFileURL(__dirname + '/job-processor.js');
/*
If you provide a file path to the worker as the second parameter,
BullMQ will run the function exported from the file in a separate thread.
That way, the main thread is not used for the CPU intense work the processor does.
*/
export function setUpWorker() {
    worker = new Worker('my-queue', processorPath, {
        connection: {
            host: REDIS_HOST,
            port: REDIS_PORT,
            username: REDIS_USER,
            password: REDIS_PASSWORD,
        },
        autorun: true,
        //useWorkerThreads: true,
    });
    worker.on('active', (job) => {
        console.debug(`Active job with id ${job.id}`);
    });
    worker.on('completed', async (job, returnvalue) => {
        console.debug(`Completed job with id ${job.id}`, returnvalue);
        console.log(await myQueue.getJobLogs(job.id));
    });
    worker.on('progress', (job, data) => {
        console.log(`Job ${job.id} reported progress ${data}`);
    });
    worker.on('error', (failedReason) => {
        console.error(`Job encountered an error`, failedReason);
    });
}
