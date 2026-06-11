import type { IOpenXBLErrorPayload } from "../services/xbox/adapter/OpenXBLAdapter";

export class AppError<T = unknown> extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400, cause?: T) {
    super(message, { cause: cause });

    this.name = "AppError";
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
