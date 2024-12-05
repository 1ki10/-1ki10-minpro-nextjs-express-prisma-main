import { Request, Response, NextFunction } from 'express';

interface DiscountInfo {
  enabled: boolean;
  percentage?: number;
  startDate?: string;
  endDate?: string;
}

interface Discounts {
  earlyBird?: DiscountInfo;
  lastMinute?: DiscountInfo;
}

const validationError = (res: Response, errors: string[]) => {
  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors
  });
};

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

const isValidTime = (timeString: string): boolean => {
  return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeString);
};

const isValidPercentage = (value: number): boolean => {
  return !isNaN(value) && value >= 0 && value <= 100;
};

export const validateEventInput = (req: Request, res: Response, next: NextFunction) => {
  const errors: string[] = [];
  const { 
    title, 
    description,
    date, 
    time, 
    location, 
    locationType,
    category,
    isFree,
    price, 
    seats,
    ticketLimit,
    discounts 
  } = req.body;

  // Required fields validation
  if (!title?.trim()) errors.push('Title is required');
  if (!description?.trim()) errors.push('Description is required');
  if (!date) errors.push('Date is required');
  if (!time) errors.push('Time is required');
  if (!location?.trim()) errors.push('Location is required');
  if (!seats) errors.push('Seats are required');

  // Type validation
  if (typeof isFree !== 'boolean') errors.push('isFree must be a boolean');
  if (locationType && !['physical', 'online'].includes(locationType)) {
    errors.push('Location type must be either physical or online');
  }

  // Date and time validation
  if (date && !isValidDate(date)) {
    errors.push('Invalid date format. Use YYYY-MM-DD format');
  }
  if (time && !isValidTime(time)) {
    errors.push('Invalid time format. Use HH:mm format');
  }

  // Numeric fields validation
  if (!isFree && price !== undefined) {
    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice < 0) {
      errors.push('Price must be a valid non-negative number');
    }
  }

  if (seats) {
    const numSeats = Number(seats);
    if (isNaN(numSeats) || numSeats < 1 || !Number.isInteger(numSeats)) {
      errors.push('Seats must be a valid positive integer');
    }
  }

  if (ticketLimit) {
    const numLimit = Number(ticketLimit);
    if (isNaN(numLimit) || numLimit < 1 || !Number.isInteger(numLimit)) {
      errors.push('Ticket limit must be a valid positive integer');
    }
  }

  // Discounts validation
  if (discounts) {
    const discountInfo = discounts as Discounts;

    if (discountInfo.earlyBird?.enabled) {
      if (!isValidPercentage(Number(discountInfo.earlyBird.percentage))) {
        errors.push('Early bird discount percentage must be between 0 and 100');
      }
      if (!isValidDate(discountInfo.earlyBird.endDate || '')) {
        errors.push('Early bird end date is required and must be valid');
      }
    }

    if (discountInfo.lastMinute?.enabled) {
      if (!isValidPercentage(Number(discountInfo.lastMinute.percentage))) {
        errors.push('Last minute discount percentage must be between 0 and 100');
      }
      if (!isValidDate(discountInfo.lastMinute.startDate || '')) {
        errors.push('Last minute start date is required and must be valid');
      }
    }
  }

  if (errors.length > 0) {
    return validationError(res, errors);
  }

  next();
};