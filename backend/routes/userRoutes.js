import express from "express"
import { getUser, getUsers } from "../controllers/userController.js";
import { authAdmin, authUser } from "../middleware/auth.js";

// Auth Router
const userRouter = express.Router()

// Auth routes
userRouter.get("/user/:id", authUser, getUser)
userRouter.get("/", authAdmin, getUsers)


// Export auth Router
export default userRouter;