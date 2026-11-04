import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { OrderStateService } from "./order-state";
import { Request, Response } from "express";
import { AdminGuard } from "./access";
import { buyerHash } from "./buyer";
import { PurchaseService } from "./purchase";
import { OrderService } from "./orders";

@Controller("api")
export class OrderController {
  constructor(
    @Inject(PurchaseService) private readonly purchases: PurchaseService,
    @Inject(OrderService) private readonly orders: OrderService,
    @Inject(OrderStateService) private readonly states: OrderStateService,
  ) {}
  @Post("checkout/review")
  review(
    @Body() input: unknown,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    buyerHash(request, response);
    return this.purchases.review(input);
  }
  @Post("checkout/confirm")
  confirm(
    @Body() input: unknown,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.purchases.confirm(input, buyerHash(request, response)!);
  }
  @Get("orders/:number")
  receipt(@Param("number") number: string, @Req() request: Request) {
    return this.orders.receipt(number, buyerHash(request));
  }
  @Get("admin/orders")
  @UseGuards(AdminGuard)
  list() {
    return this.orders.list();
  }
  @Get("admin/orders/:number")
  @UseGuards(AdminGuard)
  detail(@Param("number") number: string) {
    return this.orders.detail(number);
  }
  @Patch("admin/orders/:number/state")
  @UseGuards(AdminGuard)
  change(@Param("number") number: string, @Body() body: unknown) {
    return this.states.change(number, body);
  }
}
