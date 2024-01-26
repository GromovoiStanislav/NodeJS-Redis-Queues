import { BullModule } from "@nestjs/bullmq";
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
    AudioProcessor,
    AudioQueueEvents
  ]
})
export class AudioModule {
}