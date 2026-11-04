import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrderService } from "./orders.service";
import { OrderStateService } from "./order-state.service";
import { DatabaseModule } from "../../infrastructure/database/database.module";
import { AccessModule } from "../access/access.module";
@Module({
  imports: [DatabaseModule, AccessModule],
  controllers: [OrdersController],
  providers: [OrderService, OrderStateService],
  exports: [],
})
export class OrdersModule {}
