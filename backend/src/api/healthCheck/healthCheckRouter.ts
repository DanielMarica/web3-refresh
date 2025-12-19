import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const healthCheckRouter = Router();

healthCheckRouter.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({ status: "healthy" });
});

export default healthCheckRouter;