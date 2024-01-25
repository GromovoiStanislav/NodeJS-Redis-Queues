import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { BullBoardModule } from "@bull-board/nestjs";
import { FeatureModule } from "./feature/feature.module";
import { ExpressAdapter } from "@bull-board/express";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
        username: process.env.REDIS_USER || undefined,
        password: process.env.REDIS_PASSWORD || undefined
      },
      defaultJobOptions: {
        attempts: 1
      }
    }),

    BullBoardModule.forRoot({
      route: "/queues",
      adapter: ExpressAdapter
    }),

    BullModule.registerQueue({
      name: "feature_queue"
    }),

    FeatureModule
  ],
  controllers: [
    AppController
  ],
  providers: []
})
export class AppModule {
}