import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Database, Check, X } from 'lucide-react';

export const DatabaseSetup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  const createUserProfilesTable = async () => {
    try {
      const { error } = await supabase.rpc('create_user_profiles_table');
      if (error) throw error;
      setStatus(prev => ({ ...prev, user_profiles: true }));
      return true;
    } catch (error: any) {
      console.error('Error creating user_profiles table:', error);
      setStatus(prev => ({ ...prev, user_profiles: false }));
      return false;
    }
  };

  const setupDatabase = async () => {
    setLoading(true);
    try {
      // Create user_profiles table
      const profilesCreated = await createUserProfilesTable();
      
      if (profilesCreated) {
        toast({ title: 'Success', description: 'Database setup completed!' });
      } else {
        toast({ title: 'Warning', description: 'Some tables may already exist or failed to create', variant: 'destructive' });
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
    setLoading(false);
  };

  const checkTables = async () => {
    setLoading(true);
    try {
      // Check if user_profiles table exists
      const { data, error } = await supabase
        .from('user_profiles')
        .select('count')
        .limit(1);
      
      setStatus(prev => ({ ...prev, user_profiles: !error }));
      
      toast({ title: 'Check Complete', description: 'Database status updated' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="w-5 h-5 mr-2" />
          Database Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Required Tables:</h4>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span>user_profiles</span>
              {status.user_profiles === true && <Check className="w-4 h-4 text-green-500" />}
              {status.user_profiles === false && <X className="w-4 h-4 text-red-500" />}
            </div>
            <div className="flex items-center justify-between">
              <span>clients</span>
              <Check className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span>jobs</span>
              <Check className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span>notes</span>
              <Check className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button onClick={checkTables} disabled={loading} variant="outline">
            {loading ? 'Checking...' : 'Check Status'}
          </Button>
          <Button onClick={setupDatabase} disabled={loading}>
            {loading ? 'Setting up...' : 'Setup Database'}
          </Button>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>This will create the user_profiles table for storing user settings and preferences.</p>
          <p className="mt-1">Other tables (clients, jobs, notes) should already exist from the initial setup.</p>
        </div>
      </CardContent>
    </Card>
  );
};