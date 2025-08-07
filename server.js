import express from "express";
import mongoose from "mongoose";
import body_parser from "express";
import userRouter from "./routes/user.js";
import contactRouter from "./routes/contact.js";
import cors from "cors";

const app = express();

// app.use(body_parser.json());

app.use(cors());

app.use(express.json());

// user route or api
app.use("/api/user", userRouter);

// contact router

app.use("/api/contact", contactRouter);

mongoose
  .connect(
    "mongodb+srv://ua4536222:tayPFglhEuEedE88@cluster0.nmv5fja.mongodb.net/",
    { dbname: "contact_app" }
  )
  .then(() => console.log("mongodb connected successfully....!"))
  .catch((err) => console.log(err));

// home route
app.get("/", (req, res) => {
  res.json({ message: "this is home route working" });
});

const port = 4000;

app.listen(port, () => console.log("server is running on port", port));
