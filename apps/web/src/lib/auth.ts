import { SignInCredentials } from '@/types/auth';

export async function signIn(credentials: SignInCredentials) {
  // Implement actual sign in logic
  return Promise.resolve();
}

export function signOut() {
  // Implement sign out logic
}

export function isAuthenticated() {
  // Check if user is authenticated
  return false;
}