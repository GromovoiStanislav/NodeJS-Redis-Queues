import { Module } from "@nestjs/common";
import { CommonModule } from "../common/common.module";
import { CronJobsProcessor } from "./cron-jobs.processor";
import { MathAddProcessor } from "./math-add.processor";

@Module({
  imports: [
    CommonModule
  ],
  providers: [
    MathAddProcessor,
    CronJobsProcessor
  ]
})
export class WorkersModule {
}