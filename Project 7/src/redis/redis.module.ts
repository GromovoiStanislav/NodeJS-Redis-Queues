import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisController } from "./redis.controller";
import { RedisService } from "./redis.service";
import { RedisProcessor } from "./redis.processor";

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
          timeout: 1000,
          removeOnComplete: true,
          removeOnFail: true
        }
      })
    }),
    BullModule.registerQueue({
      name: "QUEUE_DEMO"
    })
  ],
  controllers: [
    RedisController
  ],
  providers: [
    RedisService,
    RedisProcessor
  ]
})
export class RedisModule {
}