import express from 'express';
import {
  allShopsEvents,
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
eventRouter.get('/all-events', allShopsEvents);
eventRouter.get('/:shopID/shop-events', getAllShopEvents);
eventRouter.get('/:shopID/:eventID', getShopSingleEvent);
eventRouter.delete('/:eventID', deleteShopSingleEvent);

// Export event Router
export default eventRouter;
