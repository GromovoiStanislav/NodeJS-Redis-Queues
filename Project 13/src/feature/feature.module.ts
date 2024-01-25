import { Module } from "@nestjs/common";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullModule } from "@nestjs/bullmq";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";


@Module({
  imports: [
    BullModule.registerQueue({
      name: "feature_queue"
    }),

    //Register each queue using the `forFeature` method.
    BullBoardModule.forFeature({
      name: "feature_queue",
      adapter: BullMQAdapter
    })
  ]
})
export class FeatureModule {
}