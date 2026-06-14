import express from "express";
import { register, login } from "../controllers/auth.js";
import { validateRegister, validateLogin } from "../middlewares/validation.js";

const router = express.Router();

router.post("/signup", validateRegister, register);
router.post("/signin", validateLogin, login);

export default router;
