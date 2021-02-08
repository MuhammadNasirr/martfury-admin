import { Router } from "express";
import { authMiddleware } from "./JwtAuth";

const errorRoutes = Router();
errorRoutes.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
errorRoutes.get("*", (req, res, next) => {
  res.status(404).json({ message: "Route does not exist" });
});

export { errorRoutes };
