import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { AudioProcessor } from "./audio.processor";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "audio"
    })
  ],
  controllers: [],
  providers: [AudioProcessor]
})
export class AudioModule {
}