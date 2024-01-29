import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { TestProcessor } from "./test.processor";
import { TestQueueEvents } from "./test.QueueEvents";


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

    BullModule.registerQueue({
      name: "queueName"
    })

  ],
  controllers: [AppController],
  providers: [
    //TestQueueEvents,
    TestProcessor]
})
export class AppModule {
}