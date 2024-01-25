import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { QUEUE_PARSE_JSON_TO_YAML } from "./constants";
import { AppConsumer } from "./app.consumer";

import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';



@Module({
  imports: [
    ConfigModule.forRoot(),

    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        redis: {
          host: config.get("REDIS_HOST") || "localhost",
          port: Number(config.get("REDIS_PORT")) || 6379,
          username: config.get("REDIS_USER") || undefined,
          password: config.get("REDIS_PASSWORD") || undefined
        },
        defaultJobOptions: {
          // removeOnComplete: true,
          // removeOnFail: true
        }
      })
    }),

    BullModule.registerQueue({
      name: QUEUE_PARSE_JSON_TO_YAML
    }),


    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),

    BullBoardModule.forFeature({
      name: QUEUE_PARSE_JSON_TO_YAML,
      adapter: BullMQAdapter,
    }),


  ],
  controllers: [
    AppController
  ],
  providers: [
    AppConsumer
  ]
})
export class AppModule {
}