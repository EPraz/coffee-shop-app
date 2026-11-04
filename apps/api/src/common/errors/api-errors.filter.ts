import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
import { ZodError } from "zod";

@Catch()
export class ApiErrors implements ExceptionFilter {
  catch(error: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    if (error instanceof ZodError) {
      response.status(400).json({
        code: "validation",
        fields: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    } else if (error instanceof HttpException) {
      const body = error.getResponse();
      response
        .status(error.getStatus())
        .json(
          typeof body === "object" && "code" in body
            ? body
            : { code: "request_failed" },
        );
    } else {
      console.error(
        "API request failed",
        error instanceof Error ? error.name : "unknown",
      );
      response.status(500).json({ code: "server_error" });
    }
  }
}
