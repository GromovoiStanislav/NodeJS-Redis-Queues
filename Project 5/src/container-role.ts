import { NestFactory } from "@nestjs/core";
import { MonitorModule } from "./monitor/monitor.module";
import { DefaultModule } from "./default/default.module";
import { TradeModule } from "./trade/trade.module";
import { WorkerModule } from "./worker/worker.module";

export const rolesMapBootstrap = {
  monitor: async () => {
    return await NestFactory.createApplicationContext(MonitorModule);
  },

  default: async () => {
    return await NestFactory.createApplicationContext(DefaultModule);
  },

  trade: async () => {
    return await NestFactory.createApplicationContext(TradeModule);
  },

  worker: async () => {
    return await NestFactory.createApplicationContext(WorkerModule);
  },
};