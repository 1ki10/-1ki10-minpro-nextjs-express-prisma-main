'use client';

import { SignInForm } from '@/components/auth/signin-form';
import { AuthCard } from '@/components/auth/auth-card';

export default function SignInPage() {
  return (
    <AuthCard 
      title="Welcome Back"
      subtitle="Sign in to your EventHub account"
    >
      <SignInForm />
    </AuthCard>
  );
}