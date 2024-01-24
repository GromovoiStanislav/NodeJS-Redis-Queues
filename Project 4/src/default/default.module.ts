import { Module } from "@nestjs/common";
import { DefaultProcessor } from "./default.processor";

@Module({
  imports: [],
  controllers: [],
  providers: [DefaultProcessor]
})
export class DefaultModule {
}