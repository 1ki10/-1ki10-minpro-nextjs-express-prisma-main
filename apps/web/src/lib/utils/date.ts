export function formatDate(date: string, time?: string): string {
    const dateObj = time 
      ? new Date(`${date}T${time}`) 
      : new Date(date);
  
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
  
    if (time) {
      return dateObj.toLocaleString('en-US', { ...dateOptions, ...timeOptions });
    }
  
    return dateObj.toLocaleDateString('en-US', dateOptions);
  }
  
  export function isDatePassed(date: string, time?: string): boolean {
    const eventDate = time 
      ? new Date(`${date}T${time}`) 
      : new Date(date);
    return eventDate < new Date();
  }
  
  export function getDaysUntil(date: string): number {
    const diff = new Date(date).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }