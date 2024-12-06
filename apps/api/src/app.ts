// src/app.ts
import express from 'express';
import cors from 'cors';
import path from 'path';
import eventRoutes from './routers/events';
import uploadRouter from './routers/upload';
import { errorHandler } from './middleware/error';
import { prisma } from './prisma';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection test
app.use(async (req, res, next) => {
  try {
    await prisma.$connect();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/upload', uploadRouter);

// Error handler
app.use(errorHandler);

export default app;