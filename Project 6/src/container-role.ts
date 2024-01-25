import { NestFactory } from "@nestjs/core";
import { ApiModule } from "./api/api.module";
import { CronModule } from "./cron/cron.module";
import { WorkersModule } from "./workers/workers.module";


export const rolesMapBootstrap = {
  api: async () => {
    const port = process.env.PORT || 3000;

    const app = await NestFactory.create(ApiModule);
    await app.listen(port);
    return app;
  },
  cron: async () => {
    return await NestFactory.createApplicationContext(CronModule);
  },
  workers: async () => {
    return await NestFactory.createApplicationContext(WorkersModule);
  }
};