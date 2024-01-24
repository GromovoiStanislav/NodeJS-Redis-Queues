import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { AudioModule } from "./audio/audio.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST ?? "localhost",
        port: Number(process.env.REDIS_PORT) ?? 6379,
        username: process.env.REDIS_USER ?? "",
        password: process.env.REDIS_PASSWORD ?? ""
      }
    }),

    AudioModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}