import { BullQueueEvents, OnQueueEvent, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";


@Processor("audio")
export class AudioQueueEvents {
  private readonly logger = new Logger(AudioQueueEvents.name);

  @OnQueueEvent(BullQueueEvents.ACTIVE)
  onActive(job: Job,) {
    this.logger.debug(`Start completed event: ${job.id}`);
  }

  @OnQueueEvent(BullQueueEvents.COMPLETED)
  onCompleted(job: Job, result: any) {
    this.logger.debug(`Finishing completed event: ${job.id} with result: ${result}`);
  }

  @OnQueueEvent(BullQueueEvents.FAILED)
  onFailed(job: Job, err: Error) {
    this.logger.debug(`Failed event: ${job.id} ${err.message}`);
  }
}