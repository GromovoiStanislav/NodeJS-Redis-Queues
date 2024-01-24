import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

@Processor("audio")
export class AudioProcessor {
  private readonly logger = new Logger(AudioProcessor.name);

  @Process("transcode")
  handleTranscode(job: Job) {
    this.logger.debug("Start transcoding...");
    this.logger.debug(job.data);
    this.logger.debug("Transcoding completed");
    return {file: "audio-completed.mp3"};
  }

  @Process()
  async transcode(job: Job<unknown>) {
    let progress = 0;
    this.logger.debug(job.data);
    for (let i = 0; i < 100; i++) {
      //await doSomething(job.data);
      progress += 1;
      await job.progress(progress);
    }
    return {bar: 'biz',};
  }
}