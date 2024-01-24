import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TradeModule } from "./trades/trades.module";
import { DefaultModule } from "./default/default.module";
import { MonitorModule } from "./monitor/monitor.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

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

    TradeModule,
    DefaultModule,
    MonitorModule

  ],
  controllers: [],
  providers: []
})
export class AppModule {
}