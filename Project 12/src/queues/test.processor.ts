import {
  Processor,
  WorkerHost,
  OnWorkerEvent,
  InjectQueue
} from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";

export const TEST_QUEUE_NAME = "test";
export const InjectTestQueue = (): ParameterDecorator =>
  InjectQueue(TEST_QUEUE_NAME);

@Processor(TEST_QUEUE_NAME, {
  concurrency: 3
})
export class TestProcessor extends WorkerHost {
  private readonly logger = new Logger(TestProcessor.name);

  async process(job: Job<any, any, string>): Promise<any> {
    const fail = job.data.fail;

    this.logger.log(`Processing ${job.id}`);

    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (fail) {
          return reject("Failed");
        }
        resolve();
      }, 5_000);

    });

    return "Success";
  }

  @OnWorkerEvent("active")
  onActive(job: Job) {
    this.logger.log(`Active ${job.id}`);
  }

  @OnWorkerEvent("completed")
  onCompleted(job: Job, result: any) {
    this.logger.log(`Completed ${job.id} ${result}`);
  }

  @OnWorkerEvent("failed")
  onFailed(job: Job) {
    this.logger.log(`Failed ${job.id}`);
  }
}