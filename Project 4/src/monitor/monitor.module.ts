import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { MonitorService } from "./monitor.service";
import { BullModule } from "@nestjs/bull";
import { QUEUE_DEFAULT, QUEUE_TRADES } from "../common/const";

@Module({
  imports: [ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: QUEUE_TRADES
    }),
    BullModule.registerQueue({
      name: QUEUE_DEFAULT
    })],
  providers: [MonitorService]
})
export class MonitorModule {
}