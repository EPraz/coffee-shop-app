import { Body, Controller, Inject, Post, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
import { buyerHash } from "../access/buyer-identity";
import { PurchaseService } from "./purchase.service";
@Controller("api/checkout")
export class CheckoutController {
  constructor(
    @Inject(PurchaseService) private readonly purchases: PurchaseService,
  ) {}
  @Post("review")
  review(
    @Body() input: unknown,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    buyerHash(request, response);
    return this.purchases.review(input);
  }
  @Post("confirm")
  confirm(
    @Body() input: unknown,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.purchases.confirm(input, buyerHash(request, response)!);
  }
}
