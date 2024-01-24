import {
  BullQueueEvents, BullQueueGlobalEvents,
  InjectQueue, OnGlobalQueueActive,
  OnGlobalQueueCompleted, OnGlobalQueueProgress,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueEvent, OnQueueProgress,
  Processor
} from "@nestjs/bull";
import { Job, Queue } from "bull";




@Processor("audio")
export class AudioConsumer {

  constructor(
    @InjectQueue("audio") private readonly audioQueue: Queue) {
  }


  @OnGlobalQueueActive()
  async onActive(jobId: number) {
    const job = await this.audioQueue.getJob(jobId);
    console.log(
      `Processing job ${job.id} of type ${job.name} with data`, job.data
    );
  }


  @OnGlobalQueueProgress()
  async onProgress(jobId: number, progress: number) {
    const job = await this.audioQueue.getJob(jobId);
    console.log(
      `Progress job ${job.id} of type ${job.name} is ${progress}...`
    );
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