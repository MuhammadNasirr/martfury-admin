import express from "express";
import bodyParser from "body-parser";
import { publicRouter } from "./routing/publicRoutes";
import { connect } from "./config/database";
import { errorRoutes } from "./middlewares/ErrorHandler";
import { authMiddleware } from "./middlewares/JwtAuth";

const app = express();

app.use(bodyParser.json());
connect();

app.use(publicRouter);
app.use(authMiddleware);

app.use(errorRoutes);

app.listen(3000, () => {
  console.log("Authentication service started on port 3000");
});
