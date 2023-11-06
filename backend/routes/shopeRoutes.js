import express from 'express';

// shop Router
const shopRouter = express.Router();

// shop routes
shopRouter.post('/create-shop');
shopRouter.get('/:id');

// Export shop Router
export default shopRouter;
