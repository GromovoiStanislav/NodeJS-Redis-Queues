import { Module } from "@nestjs/common";
import { DefaultProcessor } from "./default.processor";
import { CommonModule } from "../common/common.module";

@Module({
  imports: [
    CommonModule
  ],
  providers: [
    DefaultProcessor
  ]
})
export class DefaultModule {
}