import express from "express"

// event Router
const eventRouter = express.Router()

// event routes
eventRouter.post("/create-shop")
eventRouter.get("/:id")


// Export event Router
export default eventRouter;