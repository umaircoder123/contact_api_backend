import jwt from "jsonwebtoken";
import { user } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.header("auth");
  if (!token) res.json({ message: "login first", success: false });
  const decoded = jwt.varify(token, "!@#$%^()");
  const id = decoded.userId;
  let user = await user.findById(id);
  if (!user) res.json({ message: "user not found" });
  req.user = user;
  next();
};
