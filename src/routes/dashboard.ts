import express from 'express';
import authenticateUser from '../middleware/authentication';
const router = express.Router();
import dashboard from '../controllers/dashboard';

// Define a route for the dashboard
router.get('/dashboard', authenticateUser, dashboard);

export default router
