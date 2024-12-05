'use client';

import { SignUpForm } from '@/components/auth/signup-form';
import { AuthCard } from '@/components/auth/auth-card';

export default function SignUpPage() {
  return (
    <AuthCard 
      title="Create Account"
      subtitle="Join EventHub to discover amazing events"
    >
      <SignUpForm />
    </AuthCard>
  );
}