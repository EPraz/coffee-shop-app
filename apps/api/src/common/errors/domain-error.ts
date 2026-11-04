import { HttpException } from "@nestjs/common";

export class DomainError extends HttpException {
  constructor(code: string, status = 409, details?: unknown) {
    super({ code, ...(details === undefined ? {} : { details }) }, status);
  }
}
