import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} from "../controllers/users.js";

import { validateUserId } from "../middlewares/validation.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// públicas
router.get("/", getUsers);
router.post("/", createUser);

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateProfile);
router.patch("/me/avatar", auth, updateAvatar);

router.get("/:id", auth, validateUserId, getUserById);

export default router;
