import fs from "fs";
import jwt from "jsonwebtoken";

export const privateKey = fs.readFileSync("src/key/PrivateKey.pem");
export const signUser = (userid, role, isSuper) => {
  return jwt.sign({ userid, role, isSuper }, privateKey);
};
export const verifyUser = (token) => {
  return jwt.verify(token, privateKey);
};
