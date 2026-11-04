import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";
import type { Request } from "express";
import { buyerHash } from "../access/buyer-identity";
import { AdminGuard } from "../access/admin.guard";
import { OrderService } from "./orders.service";
import { OrderStateService } from "./order-state.service";
@Controller("api")
export class OrdersController {
  constructor(
    @Inject(OrderService) private readonly orders: OrderService,
    @Inject(OrderStateService) private readonly states: OrderStateService,
  ) {}
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
