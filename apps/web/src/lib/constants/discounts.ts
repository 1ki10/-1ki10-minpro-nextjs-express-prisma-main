export const DISCOUNT_TYPES = {
    earlyBird: 'Early Bird',
    lastMinute: 'Last Minute',
    groupDiscount: 'Group Discount',
    specialOffer: 'Special Offer'
  } as const;
  
  export const DISCOUNT_RULES = {
    maxPercentage: 75, // Maximum 75% discount
    minPercentage: 5,  // Minimum 5% discount
    
    earlyBird: {
      maxDaysBeforeEvent: 30,  // Early bird available up to 30 days before event
      minDaysBeforeEvent: 7,   // Must end at least 7 days before event
      recommendedPercentage: 25 // Recommended early bird discount
    },
  
    lastMinute: {
      maxDaysBeforeEvent: 7,   // Last minute starts maximum 7 days before event
      minDaysBeforeEvent: 1,   // Must start at least 1 day before event
      recommendedPercentage: 15 // Recommended last minute discount
    },
  
    groupDiscount: {
      minTickets: 5,           // Minimum tickets for group discount
      recommendedPercentage: 10 // Recommended group discount
    }
  } as const;
  
  export const DISCOUNT_VALIDATIONS = {
    percentage: {
      min: 5,
      max: 75,
      message: 'Discount percentage must be between 5% and 75%'
    },
    
    duration: {
      min: 1,
      max: 30,
      message: 'Discount duration must be between 1 and 30 days'
    }
  } as const;
  
  export const DISCOUNT_MESSAGES = {
    early: 'Book early and save!',
    last: 'Last chance to get tickets!',
    group: 'Save more when buying for a group!',
    expired: 'This discount has expired',
    notStarted: 'This discount is not yet active',
    invalid: 'This discount is not valid'
  } as const;