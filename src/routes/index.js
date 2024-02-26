import { Router } from 'express';

import userRoutes from './userRoutes.js';
import footprintRoutes from './footprintRoutes.js';

const router = Router();

// Return server's version
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    version: '1.0'
  });
});

// Return health
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'The server is up.'
  });
});

// Routes
router.use('/user', userRoutes);
router.use('/footprint', footprintRoutes);

export default router;
