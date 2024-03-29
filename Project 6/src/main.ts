import "dotenv/config"
import { Logger } from "@nestjs/common";
import { rolesMapBootstrap } from "./container-role";


async function bootstrap() {
  const role = process.env.CONTAINER_ROLE || 'api';
  await rolesMapBootstrap[role]();

  const logger = new Logger();
  logger.log(`Container role: ${role}`);
}

bootstrap();