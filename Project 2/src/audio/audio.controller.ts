import { InjectQueue } from "@nestjs/bull";
import { Controller, Post } from "@nestjs/common";
import { Queue } from "bull";

@Controller("audio")
export class AudioController {

  constructor(
    @InjectQueue("audio") private readonly audioQueue: Queue) {
  }

  @Post("transcode")
  async transcode() {
    {
      const job = await this.audioQueue.add("transcode", {
        file: "audio.mp3"
      });
      console.log(`transcode id: ${job.id}`)
    }

    {
      const job = await this.audioQueue.add(
        {
          foo: "bar"
        },
        { lifo: true }
      );
      console.log(`default id: ${job.id}`)
    }

    return "OK";
  }



}