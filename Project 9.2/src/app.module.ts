import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { ConfigModule } from "@nestjs/config";
import { AudioModule } from "./audio/audio.module";

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
      defaultJobOptions: {}
    }),

    AudioModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}