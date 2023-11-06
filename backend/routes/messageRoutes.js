import express from "express"

// message Router
const messageRouter = express.Router()

// message routes
messageRouter.post("/create-shop")
messageRouter.get("/:id")


// Export message Router
export default messageRouter;