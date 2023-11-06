import express from "express"

// order Router
const orderRouter = express.Router()

// order routes
orderRouter.post("/create-shop")
orderRouter.get("/:id")


// Export order Router
export default orderRouter;