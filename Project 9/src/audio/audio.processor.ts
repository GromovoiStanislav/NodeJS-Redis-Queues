import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

@Processor("audio")
export class AudioProcessor {
  private readonly logger = new Logger(this.constructor.name);

  @Process({ name: "*" })
  async process(job: Job) {
    this.logger.debug("Start transcoding...");
    this.logger.debug(job.data);
    this.logger.debug("Transcoding completed");
    return { status: "OK" };
  }
}