import { Controller, Delete, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Job, Queue } from "bullmq";
import { randomUUID } from "crypto";

@Controller()
export class AppController {
  constructor(@InjectQueue("queueName") private readonly queue: Queue) {
  }

  @Post("ok")
  async add() {
    return this.queue.add("transcode", {
      id: randomUUID()
    });
  }

  @Post("fail")
  async fail() {
    return this.queue.add("transcode", {
      id: "fail"
    });
  }

  @Delete("completed")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delCompleted() {
    const arr = await this.queue.getCompleted();
    arr.forEach((job: Job) => job.remove());
  }

  @Delete("failed")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delFailed() {
    const arr = await this.queue.getFailed();
    arr.forEach((job: Job) => job.remove());
  }

  @Delete("waiting")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delWaiting() {
    const arr = await this.queue.getWaiting();
    arr.forEach((job: Job) => job.remove());
  }

  @Delete("all")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delAll() {
    const arr = await this.queue.getJobs([
      "completed",
      "failed",
      "waiting"
    ]);
    arr.forEach((job: Job) => job.remove());
  }
}
