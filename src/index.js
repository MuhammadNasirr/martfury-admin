import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { publicRouter } from "./routing/PublicRoutes";
import { connect } from "./config/database";
import { errorHandler, errorRoutes } from "./middlewares/ErrorHandler";
import { authMiddleware } from "./middlewares/JwtAuth";
import { protectedRouter } from "./routing/ProtectedRoutes";
import { createLog } from "./repository/ActivityLogsRepository";
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
app.set("trust proxy", true);
app.use(bodyParser.json());
connect();
app.use((req, res, next) => {
  res.on("finish", () => {
    const { rawHeaders, httpVersion, method, socket, url } = req;

    const { statusCode, statusMessage, body } = res;
    const headers = res.getHeaders();
    // id: Number,
    // createdAt: { type: Date, default: new Date() },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "users",
    // },
    // action: { type: String, required: true },
    // userAgent: { type: String },
    // ip: { type: String },
    if (res.statusCode === 200) {
      let log;
      let api = url.split("/")[1];
      if (url.includes("login")) {
        log = {
          action: "logged into system",
          createdBy: req.body.userId,
          userAgent: req.headers["user-agent"],
          ip: req.ip,
        };
      } else if (method === "POST") {
        log = {
          action: "created a " + api,
          createdBy: req.jwtPayload?.username,
          userAgent: req.headers["user-agent"],
          ip: req.ip,
        };
      } else if (method === "PUT") {
        log = {
          action: "updated a " + api,
          createdBy: req.jwtPayload?.username,
          userAgent: req.headers["user-agent"],
          ip: req.ip,
        };
      } else if (method === "DELETE") {
        log = {
          action: "deleted a " + api,
          createdBy: req.jwtPayload?.username,
          userAgent: req.headers["user-agent"],
          ip: req.ip,
        };
      }
      if (method !== "GET") createLog({ ...log });
    }
  });

  next();
});

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
