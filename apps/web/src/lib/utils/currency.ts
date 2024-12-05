export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  }
  
  export function parseCurrency(value: string): number {
    // Remove currency symbol and non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    return parseInt(numericValue, 10) || 0;
  }