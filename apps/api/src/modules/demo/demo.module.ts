import { Module } from "@nestjs/common";
import { ResetController } from "./reset.controller";
import { ResetService } from "./reset.service";
import { DatabaseModule } from "../../infrastructure/database/database.module";
import { AccessModule } from "../access/access.module";
import { CatalogModule } from "../catalog/catalog.module";
@Module({
  imports: [DatabaseModule, AccessModule, CatalogModule],
  controllers: [ResetController],
  providers: [ResetService],
  exports: [],
})
export class DemoModule {}
