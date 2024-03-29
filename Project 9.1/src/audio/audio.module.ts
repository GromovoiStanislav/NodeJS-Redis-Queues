import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { AudioController } from "./audio.controller";
import { AudioProcessor } from "./audio.processor";
import { AudioQueueEvents } from "./audio.queueEvents";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "audio"
    })
  ],
  controllers: [
    AudioController
  ],
  providers: [
    AudioQueueEvents,
    AudioProcessor
  ]
})
export class AudioModule {
}