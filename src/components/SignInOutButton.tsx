import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, LogIn } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface SignInOutButtonProps {
  user: any;
  onSignOut: () => void;
}

export const SignInOutButton: React.FC<SignInOutButtonProps> = ({ user, onSignOut }) => {
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('crm_user');
      onSignOut();
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully',
      });
    } catch (error) {
      console.warn('Sign out error:', error);
      // Force sign out even if API fails
      localStorage.removeItem('crm_user');
      onSignOut();
      toast({
        title: 'Signed out',
        description: 'Signed out in offline mode',
      });
    }
  };

  if (!user) {
    return (
      <Button variant="ghost" size="sm">
        <LogIn className="w-4 h-4 mr-2" />
        Sign In
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleSignOut}>
      <LogOut className="w-4 h-4 mr-2" />
      Sign Out
    </Button>
  );
};