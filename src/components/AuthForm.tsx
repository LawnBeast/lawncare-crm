import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import Logo from './Logo';

interface AuthFormProps {
  onAuthSuccess: (user?: any) => void;
  offline?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess, offline = false }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (offline) {
        // Offline mode - simulate authentication
        const mockUser = {
          id: 'offline-user',
          email: email,
          created_at: new Date().toISOString()
        };
        
        toast({ 
          title: 'Offline Mode', 
          description: 'Signed in with offline access' 
        });
        
        onAuthSuccess(mockUser);
        return;
      }

      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({ title: 'Success', description: 'Logged in successfully!' });
        onAuthSuccess(data.user);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast({ title: 'Success', description: 'Account created successfully!' });
        onAuthSuccess(data.user);
      }
    } catch (error: any) {
      console.warn('Auth error:', error);
      
      // Fallback to offline mode on auth failure
      if (!offline) {
        const mockUser = {
          id: 'fallback-user',
          email: email,
          created_at: new Date().toISOString()
        };
        
        toast({
          title: 'Offline Mode',
          description: 'Authentication failed, using offline mode',
          variant: 'default'
        });
        
        onAuthSuccess(mockUser);
      } else {
        toast({
          title: 'Error',
          description: error.message || 'Authentication failed',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOfflineAccess = () => {
    const mockUser = {
      id: 'demo-user',
      email: 'demo@example.com',
      created_at: new Date().toISOString()
    };
    
    toast({ 
      title: 'Demo Mode', 
      description: 'Accessing demo version' 
    });
    
    onAuthSuccess(mockUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <CardTitle className="text-2xl">
            {offline ? 'Offline Access' : isLogin ? 'Welcome Back' : 'Get Started'}
          </CardTitle>
          <CardDescription>
            {offline 
              ? 'Limited functionality available offline'
              : isLogin 
                ? 'Sign in to your account' 
                : 'Create your account'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={!offline}
                className="mt-1"
                placeholder={offline ? 'demo@example.com' : ''}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!offline}
                className="mt-1"
                placeholder={offline ? 'demo123' : ''}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700" 
              disabled={loading}
            >
              {loading 
                ? 'Loading...' 
                : offline 
                  ? 'Access Offline' 
                  : isLogin 
                    ? 'Sign In' 
                    : 'Create Account'
              }
            </Button>
            
            {offline && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleOfflineAccess}
              >
                Continue as Demo User
              </Button>
            )}
            
            {!offline && (
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Need an account? Sign up' : 'Have an account? Sign in'}
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};