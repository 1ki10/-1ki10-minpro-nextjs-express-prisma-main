// src/routers/events.ts
import { Router } from 'express';
import { validateEventInput } from '../middleware/validation';
import { getAllEvents, createEvent, getEventById } from '../controllers/events';
import { isAuthenticated } from '../middleware/auth';
import { isOrganizer } from '../middleware/roles';

const router = Router();

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);  // Pindahkan ke public routes

// Protected routes
router.use(isAuthenticated);

// Organizer routes
router.post('/', isOrganizer, validateEventInput, createEvent);

export default router;