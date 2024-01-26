import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";

@Processor("audio")
export class AudioProcessor  extends WorkerHost {
  private readonly logger = new Logger(this.constructor.name);

  async process(job: Job) {
    this.logger.debug("Start transcoding...");
    this.logger.debug(job.data);
    this.logger.debug("Transcoding completed");
    return { status: "OK" };
  }

}