import { OnQueueEvent, QueueEventsHost, QueueEventsListener } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";


@QueueEventsListener("queueName")
export class TestQueueEvents extends  QueueEventsHost {

  private readonly logger = new Logger(TestQueueEvents.name);

  @OnQueueEvent("active")
  onActive(job: { jobId: string; prev: string }) {
    this.logger.debug(`Start event: ${job.jobId} with prev: ${job.prev}`);
  }

  @OnQueueEvent("completed")
  onCompleted(job: { jobId: string; returnvalue: string }) {
    this.logger.debug(`Finished event: ${job.jobId} with result:`, job.returnvalue);
  }

  @OnQueueEvent("failed")
  onFailed(job: { jobId: string; failedReason: string }) {
    this.logger.debug(`Failed event: ${job.jobId} with ${job.failedReason}`);
  }

  @OnQueueEvent("removed")
  onRemoved(job: { jobId: string; prev: string }) {
    this.logger.debug(`Removed event: ${job.jobId} with prev: ${job.prev}`);
  }
}