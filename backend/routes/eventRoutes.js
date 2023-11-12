import express from 'express';
import {
  createEvent,
  deleteShopSingleEvent,
  getAllShopEvents,
  getAllShopsEvents,
  getShopSingleEvent,
} from '../controllers/evnetController.js';

// event Router
const eventRouter = express.Router();

// event routes
eventRouter.post('/create-event', createEvent);
eventRouter.get('/', getAllShopsEvents);
eventRouter.get('/:shopID/shop-events', getAllShopEvents);
eventRouter.get('/:shopID/:eventID', getShopSingleEvent);
eventRouter.delete('/:eventID', deleteShopSingleEvent);

// Export event Router
export default eventRouter;
