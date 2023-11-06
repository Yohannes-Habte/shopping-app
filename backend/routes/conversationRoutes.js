import express from "express"

// conversation Router
const conversationRouter = express.Router()

// conversation routes
conversationRouter.post("/create-shop")
conversationRouter.get("/:id")


// Export conversation Router
export default conversationRouter;