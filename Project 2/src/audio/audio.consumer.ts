import {
  BullQueueEvents, BullQueueGlobalEvents,
  InjectQueue,
  OnGlobalQueueCompleted,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueEvent, OnQueueProgress,
  Processor
} from "@nestjs/bull";
import { Job, Queue } from "bull";


@Processor("audio")
export class AudioConsumer {

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data`, job.data
    );
  }


  @OnQueueProgress()
  onProgress(job: Job, progress: number) {
    console.log(
      `Progress job ${job.id} of type ${job.name} is ${progress}...`
    );
  }


  @OnQueueCompleted()
  onCompleted(job: Job, result: any) {
    console.log(
      `Completed job ${job.id} of type ${job.name} with result`, result
    );
  }


  @OnQueueEvent(BullQueueEvents.COMPLETED)
  onEventCompleted(job: Job, result: any) {
    console.log(
      `Event Completed job ${job.id} of type ${job.name} with result`, result
    );
  }


  // GLOBAL
  constructor(
    @InjectQueue("audio") private readonly audioQueue: Queue) {
  }

  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: any) {
    const job = await this.audioQueue.getJob(jobId);
    console.log("(Global) on completed: job ", job.id, " -> result: ", result);
  }

  @OnQueueEvent(BullQueueGlobalEvents.COMPLETED)
  async onGlobalEventCompleted(jobId: number, result: any) {
    const job = await this.audioQueue.getJob(jobId);
    console.log("(Global Event) on completed: job ", job.id, " -> result: ", result);
  }

}