import express from "express";
import {
  contactId,
  deleteContactById,
  getAllContact,
  newContact,
  updateContactById,
} from "../controllers/contact.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", newContact);

router.put("/:id", updateContactById);

router.get("/", getAllContact);

router.get("/:id", contactId);

router.delete("/:id", deleteContactById);

export default router;
