import { Request, Response } from 'express';
import { prisma } from '../../prisma';
import { Prisma } from '@prisma/client';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return res.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch events'
    });
  }
};

const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!event) {
      return res.json({
        success: false,
        message: 'Event not found'
      });
    }

    return res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch event'
    });
  }
};

const createEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      locationType = 'physical',
      category = 'general',
      isFree = false,
      price = 0,
      seats,
      ticketLimit,
    } = req.body;

    const eventData = {
      title: title.trim(),
      description: description.trim(),
      date,
      time,
      location: location.trim(),
      locationType,
      category,
      isFree,
      price: isFree ? 0 : Number(price),
      seats: Number(seats),
      availableSeats: Number(seats),
      ticketLimit: ticketLimit ? Number(ticketLimit) : null,
      status: 'draft',
      organizerId: req.user?.id
    };

    const event = await prisma.event.create({
      data: eventData,
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    return res.status(201).json({
      success: true,
      data: event,
      message: 'Event created successfully'
    });

  } catch (error: any) {
    console.error('Error creating event:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create event'
    });
  }
};

// Export semua fungsi
export { getAllEvents, getEventById, createEvent };