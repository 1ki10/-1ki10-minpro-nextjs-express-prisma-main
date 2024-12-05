// /types/form.ts
import type { BasicFormData, TicketFormData } from './event';
import type { DiscountFormData } from './discount';

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface BasicInfoProps {
  initialData?: Partial<BasicFormData>;
  onSubmit: (data: BasicFormData) => void;
  errors?: FormErrors;
}

export interface TicketFormProps {
  initialData?: Partial<TicketFormData>;
  onSubmit: (data: TicketFormData) => void;
  errors?: FormErrors;
}

export interface DiscountFormProps {
  initialData?: Partial<DiscountFormData>;
  onSubmit: (data: DiscountFormData) => void;
  errors?: FormErrors;
}

export interface FieldProps {
  name: string;
  label: string;
  error?: string;
  [key: string]: any;
}

export type FormStep = 'basic' | 'tickets' | 'discounts';