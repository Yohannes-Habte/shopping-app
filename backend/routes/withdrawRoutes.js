import express from "express"

// withdraw Router
const withdrawRouter = express.Router()

// withdraw routes
withdrawRouter.post("/create-shop")
withdrawRouter.get("/:id")


// Export withdraw Router
export default withdrawRouter;