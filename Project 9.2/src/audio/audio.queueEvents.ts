import { OnQueueEvent, QueueEventsHost, QueueEventsListener } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";


@QueueEventsListener("audio")
export class AudioQueueEvents extends QueueEventsHost {
  private readonly logger = new Logger(AudioQueueEvents.name);

  @OnQueueEvent("active")
  onActive(job: { jobId: string; prev: string }) {
    this.logger.debug(`Start completed event: ${job.jobId} with prev: ${job.prev}`);
  }

  @OnQueueEvent("completed")
  onCompleted(job: { jobId: string; returnvalue: string }) {
    this.logger.debug(`Finishing completed event: ${job.jobId} with result:`, job.returnvalue);
  }

  @OnQueueEvent("failed")
  onFailed(job: { jobId: string; prev: string }) {
    this.logger.debug(`Failed event: ${job.jobId} `);
  }

  @OnQueueEvent("removed")
  onRemoved(job: { jobId: string; prev: string }) {
    this.logger.debug(`Removed event: ${job.jobId} with prev: ${job.prev}`);
  }

}