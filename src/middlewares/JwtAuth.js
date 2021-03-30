import { verifyUser } from "../key";
import User from "../models/User";

const authMiddleware = async (req, res, next) => {
  console.log("authMD");
  if (!req.headers.authorization) {
    res.status(403).json({ message: "No token." });
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    req.jwtPayload = verifyUser(token);
    console.log(req.jwtPayload);
    let user = await User.findOne({
      userId: req.jwtPayload.username,
    });
    console.log(user);
    if (!user) {
      throw { message: "Session Expired" };
    }
  } catch (err) {
    console.log("jwtERROR", err);
    res.status(401).json({ status: "error", message: err.message });
    return;
  }
  console.log("jwt", req.jwtPayload);
  await next();
};

export { authMiddleware };
