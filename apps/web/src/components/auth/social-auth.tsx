'use client';

import { Button } from '@/components/ui/button';

interface SocialAuthButtonProps {
  provider: 'google' | 'github';
  onClick: () => void;
}

function SocialAuthButton({ provider, onClick }: SocialAuthButtonProps) {
  const providerInfo = {
    google: {
      name: 'Google',
      icon: '/icons/google.svg'
    },
    github: {
      name: 'GitHub',
      icon: '/icons/github.svg'
    }
  };

  const { name, icon } = providerInfo[provider];

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={onClick}
    >
      <img src={icon} alt={name} className="w-5 h-5" />
      <span>{name}</span>
    </Button>
  );
}

export function SocialAuth() {
  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
  };

  const handleGithubSignIn = () => {
    console.log('GitHub sign in clicked');
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <SocialAuthButton
        provider="google"
        onClick={handleGoogleSignIn}
      />
      <SocialAuthButton
        provider="github"
        onClick={handleGithubSignIn}
      />
    </div>
  );
}