import express from 'express';
import { createComment } from '../controllers/commentController.js';
import { authUser } from '../middleware/auth.js';
import checkValidation from '../validators/checkValidation.js';
import requiredValues from '../validators/requiredValues.js';
import commentValidator from '../validators/commentValidator.js';

// Comment Router
const commentRouter = express.Router();

// comment routes
commentRouter.post(
  '/new-comment/:userId',
  requiredValues(['firstName', 'lastName', 'message']),
  commentValidator(),
  checkValidation,
  createComment
);
commentRouter.get('/:id');
commentRouter.get('/');
commentRouter.delete('/:id');
commentRouter.delete('/');

// Export Comment Router
export default commentRouter;
