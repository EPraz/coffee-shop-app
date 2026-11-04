import { Module } from "@nestjs/common";
import { AccessModule } from "./modules/access/access.module";
import { CatalogModule } from "./modules/catalog/catalog.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { CheckoutModule } from "./modules/checkout/checkout.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { DemoModule } from "./modules/demo/demo.module";
import { HealthModule } from "./modules/health/health.module";
@Module({
  imports: [
    AccessModule,
    CatalogModule,
    OrdersModule,
    CheckoutModule,
    DashboardModule,
    DemoModule,
    HealthModule,
  ],
})
export class AppModule {}
