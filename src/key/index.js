import fs from "fs";
import jwt from "jsonwebtoken";

export const privateKey = fs.readFileSync("src/key/PrivateKey.pem");
export const signUser = (userid) => {
  return jwt.sign({ userid }, privateKey);
};
export const verifyUser = (token) => {
  return jwt.verify(token, privateKey);
};
