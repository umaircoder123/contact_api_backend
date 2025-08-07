import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  type: { type: String, required: true },
  // user: { type: mongoose.Schema.Types.objectId },
  //   createdAt: { type: Date, default: Date.now() },
});

export const Contact = mongoose.model("contact", contactSchema);
