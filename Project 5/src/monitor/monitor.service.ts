import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';
import { QUEUE_DEFAULT, QUEUE_TRADES } from '../common/const';


@Injectable()
export class MonitorService {


  constructor(
    @InjectQueue(QUEUE_DEFAULT) private queue: Queue,
    @InjectQueue(QUEUE_TRADES) private queueTrades: Queue,

  ) {

  }

  @Cron(CronExpression.EVERY_SECOND)
  async report() {

    const data = [
      {
        queue: QUEUE_DEFAULT,
        jobs_waiting: await this.queue.getWaitingCount(),
        jobs_completed: await this.queue.getCompletedCount(),
        jobs_failed: await this.queue.getFailedCount(),
        jobs_active: await this.queue.getActiveCount(),
        jobs_paused: await this.queue.getPausedCount(),
      },
      {
        queue: QUEUE_TRADES,
        jobs_waiting: await this.queueTrades.getWaitingCount(),
        jobs_completed: await this.queueTrades.getCompletedCount(),
        jobs_failed: await this.queueTrades.getFailedCount(),
        jobs_active: await this.queueTrades.getActiveCount(),
        jobs_paused: await this.queueTrades.getPausedCount(),
      },
    ];

    console.clear();
    console.table(data.filter((d) => d.jobs_completed > 0));
  }

}