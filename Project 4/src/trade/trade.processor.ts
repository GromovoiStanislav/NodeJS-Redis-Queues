import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { QUEUE_TRADES } from "../common/const";
import { TradeCreatedDto } from "../common/dto/trade-created.dto";
import { delay } from "../common/utils/delay";

@Processor(QUEUE_TRADES)
export class TradeProcessor {

  private readonly logger = new Logger(this.constructor.name);

  @Process({ name: '*'})
  async handleTranscode(job: Job<TradeCreatedDto>) {
    await delay(200);
    this.logger.debug(`${job.name} - ${job.data.uuid}`);
  }


}