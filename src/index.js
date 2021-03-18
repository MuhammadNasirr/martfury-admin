import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { publicRouter } from "./routing/PublicRoutes";
import { connect } from "./config/database";
import { errorHandler, errorRoutes } from "./middlewares/ErrorHandler";
import { authMiddleware } from "./middlewares/JwtAuth";
import { protectedRouter } from "./routing/ProtectedRoutes";
const filemanagerMiddleware = require("@opuscapita/filemanager-server")
  .middleware;
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "jawadserver101",
  api_key: "217182419745265",
  api_secret: "XBreEevyyT5THVw6OE0_1UHMwjk",
});

const fileManagerConfig = {
  fsRoot: __dirname,
  rootName: "uploads",
};

var methodOverride = require("method-override");
// let spawn = require("child_process").spawn;
// let backupProcess = spawn("mongodump", [
//   '--uri="mongodb+srv://test:test1234@cluster0.13uvc.mongodb.net/server?retryWrites=true&w=majority"',
//   "--archive=.",
//   "--gzip",
// ]);

// backupProcess.on("exit", (code, signal) => {
//   if (code) console.log("Backup process exited with code ", code);
//   else if (signal)
//     console.error("Backup process was killed with singal ", signal);
//   else console.log("Successfully backedup the database");
// });
const app = express();
app.use(cors());
app.use(bodyParser.json());
connect();

const baseUrl = process.env.BASE_URL || "/";

app.use(baseUrl, filemanagerMiddleware(fileManagerConfig));
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
