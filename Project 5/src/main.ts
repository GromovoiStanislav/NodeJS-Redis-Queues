import "dotenv/config"
import { Logger } from "@nestjs/common";
import { rolesMapBootstrap } from "./container-role";


async function bootstrap() {
  const logger = new Logger("Main");
  const role = process.env.CONTAINER_ROLE || 'monitor';
  await rolesMapBootstrap[role]();
  logger.log(`Container role: ${role}`);
}

bootstrap();