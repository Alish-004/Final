import express from 'express';
import { 
  requestExtension, 
  payForExtension, 
  processExtension, 
  getPendingExtensions,
  getUserExtensions
} from '../controllers/extensionController.js';
import { auth, admin } from '../middleware/auth.js';

const router = express.Router();

// User routes
router.post('/request', auth, requestExtension);
router.post('/pay', auth, payForExtension);
router.get('/user', auth, getUserExtensions);

// Admin routes
router.get('/pending', auth, admin, getPendingExtensions);
router.post('/process', auth, admin, processExtension);

export default router;