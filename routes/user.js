import express from "express";
import { register, login } from "../controllers/users.js";

export const router = express.Router();
// register
router.post("/register", register);

// login
router.post("/login", login);

export default router;
