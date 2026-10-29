import { Router } from "express";
import { slides } from "../data/slides";

export const slidesRouter = Router();

slidesRouter.get("/", (_req, res) => {
  res.json(slides);
});
