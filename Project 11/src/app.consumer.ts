import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as YAML from 'json-to-pretty-yaml';
import { DataToTransformDto } from './data-to-transform.dto';
import { QUEUE_PARSE_JSON_TO_YAML } from "./constants";


@Processor(QUEUE_PARSE_JSON_TO_YAML)
export class AppConsumer {
  @Process()
  async handle(job: Job<DataToTransformDto>) {
    const json = JSON.parse(job.data.data);
    console.log(json);
    const data = YAML.stringify(json);
    console.log(data);
    return;
  }
}