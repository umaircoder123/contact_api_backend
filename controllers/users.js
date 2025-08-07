import bcrypt from "bcrypt";
import { user } from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    // console.log("data", req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.json({
        message: "All fields are required",
        success: false,
      });
    if (email.length < 19)
      return res.json({
        message: "Email must be at least 19 characters long",
        success: false,
      });
    const uppercasePattern = /[A-Z]/;
    if (password.length < 7 || !uppercasePattern.test(password))
      return res.json({
        message:
          "Password must be at least 7 characters long and contain at least one uppercase letter",
        success: false,
      });
    let userObj = await user.findOne({ email });
    if (userObj) {
      return res.json({ message: "User already exists", success: false });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    let newUser = await user.create({
      name,
      email,
      password: hashpassword,
    });

    return res.json({
      message: "User created successfully",
      user: newUser,
      success: true,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({
        message: "All fields are required",
        success: false,
      });

    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.json({
        message: "User not found",
        success: false,
      });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.json({ message: "Password does not match", success: false });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET || "!@#$%^()"
    );

    res.json({
      message: "Welcome",
      name: existingUser.name,
      token,
      success: true,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
