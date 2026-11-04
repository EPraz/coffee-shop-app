import { Module } from "@nestjs/common";
import { CatalogController } from "./catalog.controller";
import { CatalogService } from "./catalog.service";
import { CatalogEditor } from "./catalog-editor.service";
import { DatabaseModule } from "../../infrastructure/database/database.module";
import { AccessModule } from "../access/access.module";
@Module({
  imports: [DatabaseModule, AccessModule],
  controllers: [CatalogController],
  providers: [CatalogService, CatalogEditor],
  exports: [],
})
export class CatalogModule {}
