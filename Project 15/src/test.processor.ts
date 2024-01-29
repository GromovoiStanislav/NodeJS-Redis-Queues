import { OnQueueEvent, OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { Logger } from "@nestjs/common";

@Processor("queueName")
export class TestProcessor extends WorkerHost {

  private readonly logger = new Logger(TestProcessor.name);

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.debug(`job.id: ${job.id} with data:`, job.data);

    await sleep(100);

    if (job.data.id === "fail") {
      throw new Error("Some wrong");
    }

    return { status: "OK" };
  }

  ////////////////

  @OnWorkerEvent("active")
  onActive(job: Job, prev: string) {
    this.logger.debug(`Start event: ${job.id} with prev: ${prev}`);

  }

  @OnWorkerEvent("completed")
  onCompleted(job: Job, returnvalue: any) {
    this.logger.debug(`Finished event: ${job.id} with result:`, returnvalue);
  }


  @OnWorkerEvent("failed")
  onFailed(job: Job, failedReason: string) {
    this.logger.debug(`Failed event: ${job.id} with ${failedReason}`);
  }



}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}