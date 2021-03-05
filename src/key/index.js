import fs from "fs";
import jwt from "jsonwebtoken";

export const privateKey = fs.readFileSync("src/key/PrivateKey.pem");
export const signUser = (userid, role) => {
  return jwt.sign({ userid, role }, privateKey);
};
export const verifyUser = (token) => {
  return jwt.verify(token, privateKey);
};
