import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { publicRouter } from "./routing/PublicRoutes";
import { connect } from "./config/database";
import { errorHandler, errorRoutes } from "./middlewares/ErrorHandler";
import { authMiddleware } from "./middlewares/JwtAuth";
import { protectedRouter } from "./routing/ProtectedRoutes";
var methodOverride = require("method-override");

const app = express();
app.use(cors());
app.use(bodyParser.json());
connect();

app.use(publicRouter);
app.use(protectedRouter);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use(errorHandler);
app.listen(process.env.PORT || 3000, () => {
  console.log("Authentication service started on port 3000");
});
