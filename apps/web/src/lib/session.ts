import { User } from '@/types/auth';

export function getCurrentUser(): Promise<User | null> {
  // Implement get current user logic
  return Promise.resolve(null);
}

export function getSession() {
  // Get current session
  return null;
}