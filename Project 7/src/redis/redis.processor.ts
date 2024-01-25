import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { RedisJob } from "./models/redis.job";

@Processor('QUEUE_DEMO')
export class RedisProcessor {
  protected readonly logger = new Logger(this.constructor.name);

  @Process()
  process(job: Job<RedisJob>) {
    this.logger.log(`Redis job result: ${job.data.uuid}`);
  }
}