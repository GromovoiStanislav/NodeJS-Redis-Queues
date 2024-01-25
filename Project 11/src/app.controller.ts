import {
  Body,
  Controller,
  HttpCode, HttpStatus,
  Post
} from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { DataToTransformDto } from "./data-to-transform.dto";
import { QUEUE_PARSE_JSON_TO_YAML } from "./constants";


@Controller()
export class AppController {

  constructor(
    @InjectQueue(QUEUE_PARSE_JSON_TO_YAML) private parseJsonToYamlQueue: Queue
  ) {
  }

  @Post("/publish")
  @HttpCode(HttpStatus.ACCEPTED)
  async publishToJsonQueue(@Body() data) {

    const dataToTransform: DataToTransformDto = {
      data: JSON.stringify(data)
    };

    return this.parseJsonToYamlQueue.add(dataToTransform);
  }

}