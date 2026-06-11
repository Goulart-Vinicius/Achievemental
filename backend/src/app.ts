import path from "path";
import createError from "http-errors";
import express, {
  type Request,
  type Response,
  type NextFunction,
  type Express,
} from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import "express-async-errors";

import xboxRouter from "./routes/xbox";
import { fileURLToPath } from "url";
import { AppError } from "./errors/AppError";

const app: Express = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// view engine setup
app.set("views", path.join(dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(dirname, "public")));

app.use("/xbox", xboxRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      cause: err.cause ?? undefined,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  console.error("🔥 Erro inesperado:", err);

  res.status(500).json({
    status: "error",
    message:
      process.env.NODE_ENV === "development" ?
        err.message
      : "Erro interno do servidor",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export default app;
