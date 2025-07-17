import React, { useState, useEffect } from 'react';
import { supabase, testConnection } from '@/lib/supabase';
import { AuthForm } from './AuthForm';
import { CRMApp } from './CRMApp';
import { useToast } from '@/hooks/use-toast';

export const CRMWithAuth: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      // Test connection first
      const connected = await testConnection();
      setIsOnline(connected);
      
      if (connected) {
        // Check current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.warn('Auth session error:', error);
          handleOfflineMode();
        } else {
          setUser(session?.user ?? null);
          
          // Listen for auth changes
          const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
          });
          
          // Cleanup subscription on unmount
          return () => subscription.unsubscribe();
        }
      } else {
        handleOfflineMode();
      }
    } catch (error) {
      console.warn('Auth initialization error:', error);
      handleOfflineMode();
    } finally {
      setLoading(false);
    }
  };

  const handleOfflineMode = () => {
    // Check for stored user session
    const storedUser = localStorage.getItem('crm_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.warn('Failed to parse stored user:', error);
      }
    }
    
    toast({
      title: 'Offline Mode',
      description: 'Running in offline mode with limited functionality.',
      variant: 'default'
    });
  };

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    // Store user data for offline access
    localStorage.setItem('crm_user', JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('crm_user');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md">
          {!isOnline && (
            <div className="mb-4 p-3 bg-amber-100 border border-amber-300 rounded-md">
              <p className="text-sm text-amber-800">
                Offline mode - Authentication disabled
              </p>
            </div>
          )}
          <AuthForm onAuthSuccess={handleAuthSuccess} offline={!isOnline} />
        </div>
      </div>
    );
  }

  return <CRMApp user={user} onSignOut={handleSignOut} />;
};