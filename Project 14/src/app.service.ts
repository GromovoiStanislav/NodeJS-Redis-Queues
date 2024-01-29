import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { REDIS_QUEUE_NAME } from "./constants";
import { Queue } from "bull";
import { randomUUID } from "crypto";

@Injectable()
export class AppService {

  constructor(
    @InjectQueue(REDIS_QUEUE_NAME) private queue: Queue
  ) {
  }

  getHello(): string {
    return "Hello World!";
  }

  async processData() {
    return await this.queue.add(
      "process_data",
      { custom_id: randomUUID() },
      { priority: 1 }
    );
  }
}