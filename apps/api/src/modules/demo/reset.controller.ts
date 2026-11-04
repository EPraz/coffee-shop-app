import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { AdminGuard } from "../access/admin.guard";
import { ResetService } from "./reset.service";
@Controller("api/admin/reset")
@UseGuards(AdminGuard)
export class ResetController {
  constructor(@Inject(ResetService) private readonly demo: ResetService) {}
  @Post() reset(@Body() input: unknown) {
    return this.demo.reset(input);
  }
}
