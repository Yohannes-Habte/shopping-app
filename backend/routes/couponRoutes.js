import express from "express"

// coupon Router
const couponRouter = express.Router()

// coupon routes
couponRouter.post("/create-shop")
couponRouter.get("/:id")


// Export coupon Router
export default couponRouter;