import { Controller, Get, Inject, Query, UseGuards } from "@nestjs/common";
import { AdminGuard } from "../access/admin.guard";
import { DashboardService } from "./dashboard.service";
@Controller("api/admin/dashboard")
@UseGuards(AdminGuard)
export class DashboardController {
  constructor(
    @Inject(DashboardService) private readonly dashboard: DashboardService,
  ) {}
  @Get() read(@Query() query: unknown) {
    return this.dashboard.read(query);
  }
}
