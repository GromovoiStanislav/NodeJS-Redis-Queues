import { Controller, Post } from "@nestjs/common";
import { TradeService } from "./trade.service";


@Controller("trades")
export class TradeController {

  constructor(
    private tradeService: TradeService
  ) {
  }

  @Post()
  async add() {
    await this.tradeService.add();
    return "OK";
  }

}