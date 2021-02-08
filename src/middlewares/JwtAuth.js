import { verifyUser } from "../key";

const authMiddleware = async (req, res, next) => {
  console.log("authMD");
  if (!req.headers.authorization) {
    res.status(403).json({ message: "No token." });
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    req.jwtPayload = verifyUser(token);
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ message: err.message });
    return;
  }
  console.log("jwt", req.jwtPayload);
  await next();
};

export { authMiddleware };
