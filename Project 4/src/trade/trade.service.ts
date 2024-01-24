import { Injectable, Logger } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { randomUUID } from "crypto";
import {
  JOB_ANALYTICS,
  JOB_NOTIFICATION,
  JOB_STORE,
  JOB_TRADE_CONFIRM,
  QUEUE_DEFAULT,
  QUEUE_TRADES
} from "../common/const";


@Injectable()
export class TradeService {

  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @InjectQueue(QUEUE_TRADES) private queueTrades: Queue,
    @InjectQueue(QUEUE_DEFAULT) private queue: Queue
  ) {
  }

  async add() {
    const uuid = randomUUID();

    await this.queueTrades.add(JOB_ANALYTICS, { uuid });
    await this.queueTrades.add(JOB_STORE, { uuid });
    await this.queueTrades.add(JOB_NOTIFICATION, { uuid });
    await this.queueTrades.add(JOB_TRADE_CONFIRM, { uuid });

    await this.queue.add(JOB_STORE, { uuid });

    this.logger.log(`Trade ${uuid} created`);
  }
}
