import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { randomUUID } from "crypto";

@Injectable()
export class RedisService {

  constructor(
    @InjectQueue("QUEUE_DEMO") private queue: Queue
  ) {
  }

  getHello(): string {
    return "Hello World!";
  }

  async queueFakeJob(): Promise<void> {
    await this.queue.add({ uuid: randomUUID() });
  }
}