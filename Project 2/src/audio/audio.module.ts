import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { AudioController } from "./audio.controller";
import { AudioProcessor } from "./audio.processor";
import { AudioConsumer } from "./audio.consumer";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "audio"
    })
  ],
  controllers: [AudioController],
  providers: [AudioProcessor, AudioConsumer]
})
export class AudioModule {
}