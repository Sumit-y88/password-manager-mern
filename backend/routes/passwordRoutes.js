import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  addPassword,
  getPasswords,
  updatePassword,
  deletePassword
} from "../controllers/passwordController.js";

const router = express.Router();

router.post("/", protect, addPassword);
router.get("/", protect, getPasswords);
router.put("/:id", protect, updatePassword);
router.delete("/:id", protect, deletePassword);

export default router;
