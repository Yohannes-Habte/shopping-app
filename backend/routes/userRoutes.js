import express from "express"
import { createAccount } from "../controllers/authController.js";

// Auth Router
const userRouter = express.Router()

// Auth routes
userRouter.get("/", createAccount)


// Export auth Router
export default userRouter;