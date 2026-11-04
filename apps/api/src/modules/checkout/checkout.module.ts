import { Module } from "@nestjs/common";
import { CheckoutController } from "./checkout.controller";
import { PurchaseService } from "./purchase.service";
import { DatabaseModule } from "../../infrastructure/database/database.module";
import { AccessModule } from "../access/access.module";
import { OrdersModule } from "../orders/orders.module";
@Module({
  imports: [DatabaseModule, AccessModule, OrdersModule],
  controllers: [CheckoutController],
  providers: [PurchaseService],
  exports: [],
})
export class CheckoutModule {}
