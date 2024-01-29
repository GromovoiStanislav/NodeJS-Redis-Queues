import Bull from 'bull';

const queue = new Bull('my-first-queue');

console.log(await queue.getJobCounts());

console.log('completed:', await queue.getCompletedCount());
console.log('failed:', await queue.getFailedCount());
console.log('delayed:', await queue.getDelayedCount());
console.log('active:', await queue.getActiveCount());
console.log('waiting:', await queue.getWaitingCount());
console.log('paused:', await queue.getPausedCount());

setTimeout(() => queue.close(), 3000);
