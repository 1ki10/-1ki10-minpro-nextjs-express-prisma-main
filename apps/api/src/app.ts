import express from 'express';
import cors from 'cors';
import path from 'path';
import eventRoutes from './routers/events';
import uploadRouter from './routers/upload';
import { errorHandler } from './middleware/error';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static file serving untuk uploads
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/upload', uploadRouter);

// Error handler - harus diletakkan setelah semua routes
app.use(errorHandler);

export default app;