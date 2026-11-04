import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { AdminGuard } from "../access/admin.guard";
import { CatalogService } from "./catalog.service";
import { CatalogEditor } from "./catalog-editor.service";
@Controller("api")
export class CatalogController {
  constructor(
    @Inject(CatalogService) private readonly catalog: CatalogService,
    @Inject(CatalogEditor) private readonly editor: CatalogEditor,
  ) {}
  @Get("catalog") read() {
    return this.catalog.read();
  }
  @Get("admin/catalog")
  @UseGuards(AdminGuard)
  admin() {
    return this.catalog.read();
  }
  @Patch("admin/catalog/:id")
  @UseGuards(AdminGuard)
  update(@Param("id") id: string, @Body() body: unknown) {
    return this.editor.update(id, body);
  }
}
