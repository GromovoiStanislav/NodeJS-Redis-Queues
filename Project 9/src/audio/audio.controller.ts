import { Controller, Delete, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue, Job } from "bull";


@Controller("audio")
export class AudioController {

  constructor(
    @InjectQueue("audio") private readonly audioQueue: Queue
  ) {
  }

  @Post("transcode")
  async transcode() {
    return this.audioQueue.add("transcode", {
      file: "audio.mp3"
    });
  }

  @Delete("completed")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delCompleted() {
    const arr = await this.audioQueue.getCompleted();
    arr.forEach((job: Job) => job.remove());
  }

  @Delete("failed")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delFailed() {
    const arr = await this.audioQueue.getFailed();
    arr.forEach((job: Job) => job.remove());
  }

  @Delete("waiting")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delWaiting() {
    const arr = await this.audioQueue.getWaiting();
    arr.forEach((job: Job) => job.remove());
  }

  @Delete("all")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delAll() {
    const arr = await this.audioQueue.getJobs(["completed", "failed","waiting"]);
    arr.forEach((job: Job) => job.remove());
  }

}