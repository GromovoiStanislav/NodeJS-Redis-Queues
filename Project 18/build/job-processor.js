export async function jobProcessor(job) {
    await job.log(`Started processing job with id ${job.id}`);
    console.log(`Job with id ${job.id}`, job.data);
    // TODO: do your CPU intense logic here
    await job.updateProgress(100);
    return 'DONE';
}
