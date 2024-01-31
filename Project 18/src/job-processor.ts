import { Job } from 'bullmq';

export default async function jobProcessor(job: Job): Promise<'DONE'> {
  await job.log(`Started processing job with id ${job.id}`);
  console.log(`Job with id ${job.id} with`, job.data);

  // TODO: do your CPU intense logic here

  await job.updateProgress(100);
  return 'DONE';
}
