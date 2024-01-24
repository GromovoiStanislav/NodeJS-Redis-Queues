import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioConsumer } from "./audio.consumer";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "audio",
    }),
  ],
  controllers: [AudioController],
  providers: [AudioConsumer],
})
export class AudioModule {}