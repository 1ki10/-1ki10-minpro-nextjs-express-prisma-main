import { Router } from 'express';
import { validateEventInput } from '../middleware/validation';
import { createEvent } from '../controllers/events';
import { isAuthenticated } from '../middleware/auth';
import { isOrganizer } from '../middleware/roles';

const router = Router();

// Public routes
router.get('/', (req, res) => {
  res.json({ message: 'Events list endpoint' });
});

// Protected routes
router.use(isAuthenticated);

// Organizer routes
router.post('/', isOrganizer, validateEventInput, createEvent);

export default router;