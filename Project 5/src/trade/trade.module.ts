import { Module } from "@nestjs/common";
import { TradeProcessor } from "./trade.processor";
import { CommonModule } from "../common/common.module";

@Module({
  imports: [
    CommonModule
  ],
  providers: [
    TradeProcessor
  ]
})
export class TradeModule {
}