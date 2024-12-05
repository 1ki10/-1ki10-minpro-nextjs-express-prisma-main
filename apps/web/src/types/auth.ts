export interface User {
    id: string;
    name: string;
    email: string;
    role: 'customer' | 'organizer';
  }
  
  export interface SignInCredentials {
    email: string;
    password: string;
  }
  
  export interface SignUpData {
    name: string;
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }