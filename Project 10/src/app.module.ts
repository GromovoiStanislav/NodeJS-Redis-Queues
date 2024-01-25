import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TranscodeConsumer } from "./transcode.consumer";
import { TRANSCODE_QUEUE } from "./constants";


@Module({
  imports: [
    ConfigModule.forRoot(),

    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        redis: {
          host: config.get("REDIS_HOST") || "localhost",
          port: +config.get("REDIS_PORT") || 6379,
          username: config.get("REDIS_USER") || undefined,
          password: config.get("REDIS_PASSWORD") || undefined
        },
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: true
        }
      })
    }),

    BullModule.registerQueue({
      name: TRANSCODE_QUEUE
    })
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    TranscodeConsumer
  ]
})
export class AppModule {
}