import { Module } from "@nestjs/common";
import { AccessController } from "./access.controller";
import { AdminGuard } from "./admin.guard";
@Module({
  imports: [],
  controllers: [AccessController],
  providers: [AdminGuard],
  exports: [AdminGuard],
})
export class AccessModule {}
