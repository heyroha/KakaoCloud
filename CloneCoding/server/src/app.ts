import express from "express";
import { slidesRouter } from "./routes/slides";
import { reservationsRouter } from "./routes/reservations";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });
  app.use("/api/slides", slidesRouter);
  app.use("/api/reservations", reservationsRouter);

  return app;
}
