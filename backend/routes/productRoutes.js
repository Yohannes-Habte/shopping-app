import express from "express"

// product Router
const productRouter = express.Router()

// product routes
productRouter.post("/create-shop")
productRouter.get("/:id")


// Export product Router
export default productRouter;