import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { MonitorService } from "./monitor.service";
import { CommonModule } from "../common/common.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CommonModule
  ],
  providers: [
    MonitorService
  ]
})
export class MonitorModule {
}