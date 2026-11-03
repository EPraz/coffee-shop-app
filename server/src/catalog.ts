import {
  Body,
  Controller,
  Get,
  Inject,
  Injectable,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { CatalogEditor } from "./catalog-edit";
import { Database } from "./database";
import { AdminGuard } from "./access";
import {
  coffeeDefinitions,
  type Coffee,
  type Preparation,
  type Weight,
} from "../../shared/catalog";

@Injectable()
export class CatalogService {
  constructor(@Inject(Database) private readonly db: Database) {}
  async read() {
    return this.db.$transaction(
      async (tx) => {
        const store = await tx.store.findUniqueOrThrow({
          where: { id: "bruma" },
        });
        const records = await tx.coffee.findMany({
          include: { variants: { orderBy: { id: "asc" } } },
        });
        const coffees: Coffee[] = coffeeDefinitions.map((definition) => {
          const record = records.find((item) => item.id === definition.id)!;
          return {
            ...definition,
            enabled: record.available,
            available:
              record.available &&
              record.variants.some((variant) => variant.stock > 0),
            prices: { 250: record.price250, 500: record.price500 },
            version: record.version,
            variants: record.variants.map((variant) => ({
              weight: variant.weight as Weight,
              preparation: variant.preparation as Preparation,
              stock: variant.stock,
            })),
          };
        });
        return { generation: store.generation, coffees };
      },
      { isolationLevel: "RepeatableRead" },
    );
  }
}
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
