import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),

    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get("REDIS_HOST") || "127.0.0.1",
          port: Number(configService.get("REDIS_PORT")) || 6379,
          username: configService.get("REDIS_USER") || undefined,
          password: configService.get("REDIS_PASSWORD") || undefined
        }
      }),
      inject: [ConfigService]
    }),
    BullModule.registerQueue({
      name: "math-add"
    }),
    BullModule.registerQueue({
      name: "cron-jobs"
    })
  ],

  exports: [
    BullModule
  ]
})
export class CommonModule {
}