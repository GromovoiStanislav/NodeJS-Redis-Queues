import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { TradeController } from "./trade.controller";
import { TradeProcessor } from "./trade.processor";
import { TradeService } from "./trade.service";
import { QUEUE_DEFAULT, QUEUE_TRADES } from "../common/const";


@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_TRADES
    }),
    BullModule.registerQueue({
      name: QUEUE_DEFAULT
    })
  ],
  controllers: [TradeController],
  providers: [TradeService, TradeProcessor]
})
export class TradeModule {
}