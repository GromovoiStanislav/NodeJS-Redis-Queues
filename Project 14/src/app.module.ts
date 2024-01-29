import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BullModule } from "@nestjs/bull";
import { REDIS_QUEUE_NAME } from "./constants";
import { ProcessDataConsumer } from "./process-data.consumer";
import { BullBoardModule } from "@bull-board/nestjs";
import { ExpressAdapter } from "@bull-board/express";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { ConfigModule, ConfigService } from "@nestjs/config";


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
      name: REDIS_QUEUE_NAME,
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter, // Or FastifyAdapter from `@bull-board/fastify`
    }),
    BullBoardModule.forFeature({
      name: REDIS_QUEUE_NAME,
      adapter: BullAdapter,
    }),

  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    ProcessDataConsumer
  ]
})
export class AppModule {
}