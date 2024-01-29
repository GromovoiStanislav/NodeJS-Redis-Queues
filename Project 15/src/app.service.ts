import { Processor, WorkerHost, OnQueueEvent } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { Logger } from "@nestjs/common";


@Processor("queueName")
export class TestProcessor extends WorkerHost {
  private readonly logger = new Logger(TestProcessor.name);

  async process(job: Job<any, any, string>): Promise<any> {
    return { status: "OK" };
  }


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
}