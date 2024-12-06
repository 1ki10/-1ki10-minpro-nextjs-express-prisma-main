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

// Static files dengan header Cache-Control
app.use('/uploads', (req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache selama 1 tahun
  next();
}, express.static(path.join(__dirname, '../public/uploads'), {
  maxAge: '1y'
}));

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

// Tambahkan error handler untuk 404 pada file static
app.use('/uploads', (req, res) => {
  res.status(404).json({ error: 'File not found' });
});

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/upload', uploadRouter);

// Error handler
app.use(errorHandler);

export default app;