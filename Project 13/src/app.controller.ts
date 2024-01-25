import { Controller, Post } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { randomUUID } from "crypto";


@Controller()
export class AppController {

  constructor(
    @InjectQueue("feature_queue") private readonly featureQueue: Queue
  ) {
  }

  @Post("add")
  addToQueue() {
    return this.featureQueue.add("", { id: randomUUID() });
  }
}