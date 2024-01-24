import { Module } from "@nestjs/common";

import { CommonModule } from "../common/common.module";
import { WorkerService } from "./worker.service";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CommonModule
  ],
  providers: [
    WorkerService
  ]
})
export class WorkerModule {
}