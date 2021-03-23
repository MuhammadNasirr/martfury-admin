import fs from "fs";
import jwt from "jsonwebtoken";

export const privateKey = fs.readFileSync("src/key/PrivateKey.pem");
export const signUser = (userid, role, isSuper, username) => {
  return jwt.sign({ userid, role, isSuper, username }, privateKey);
};

export const signConstomer = (id, name, email, type = "Customer") => {
  return jwt.sign({ id, name, email, type }, privateKey);
};
export const verifyUser = (token) => {
  return jwt.verify(token, privateKey);
};
