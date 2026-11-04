import { Module } from "@nestjs/common";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";
import { DatabaseModule } from "../../infrastructure/database/database.module";
import { AccessModule } from "../access/access.module";
import { OrdersModule } from "../orders/orders.module";
@Module({
  imports: [DatabaseModule, AccessModule, OrdersModule],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [],
})
export class DashboardModule {}
