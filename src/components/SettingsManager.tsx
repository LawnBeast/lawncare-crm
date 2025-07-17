import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { User, Bell, Shield, Palette, Database, Plug } from 'lucide-react';
import { SettingsProfile } from './SettingsProfile';
import { SettingsNotifications } from './SettingsNotifications';
import { SettingsAppearance } from './SettingsAppearance';
import { SettingsSecurity } from './SettingsSecurity';
import { SettingsIntegrations } from './SettingsIntegrations';
import { DatabaseSetup } from './DatabaseSetup';

export const SettingsManager: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState({
    full_name: '', phone: '', company: '', job_title: '', bio: '', timezone: 'UTC', language: 'en'
  });
  const [notifications, setNotifications] = useState({
    email: true, push: false, sms: false, desktop: true, frequency: 'instant',
    quietHours: false, quietStart: '22:00', quietEnd: '07:00',
    jobReminders: true, clientUpdates: true, systemAlerts: true, marketingEmails: false
  });
  const [appearance, setAppearance] = useState({
    theme: 'system', colorScheme: 'blue', fontSize: 14, compactMode: false,
    animations: true, highContrast: false, sidebarCollapsed: false, showAvatars: true
  });
  const [security, setSecurity] = useState({
    twoFactorEnabled: false, sessionTimeout: 30, loginNotifications: true, passwordExpiry: false
  });
  const [integrations, setIntegrations] = useState([
    { id: 'slack', name: 'Slack', description: 'Get notifications in Slack', icon: '💬', connected: false },
    { id: 'zapier', name: 'Zapier', description: 'Automate workflows', icon: '⚡', connected: false },
    { id: 'gmail', name: 'Gmail', description: 'Sync emails with contacts', icon: '📧', connected: false },
    { id: 'calendar', name: 'Google Calendar', description: 'Sync job schedules', icon: '📅', connected: false }
  ]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        try {
          const { data: profileData } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();
          
          if (profileData) {
            setProfile({
              full_name: profileData.full_name || '',
              phone: profileData.phone || '',
              company: profileData.company || '',
              job_title: profileData.job_title || '',
              bio: profileData.bio || '',
              timezone: profileData.timezone || 'UTC',
              language: profileData.language || 'en'
            });
            setNotifications(profileData.notifications || notifications);
            setAppearance(profileData.appearance || appearance);
            setSecurity(profileData.security || security);
            setIntegrations(profileData.integrations || integrations);
          }
        } catch (error) {
          console.log('Profile table may not exist yet');
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const saveAllSettings = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          ...profile,
          notifications,
          appearance,
          security,
          integrations,
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
      toast({ title: 'Success', description: 'All settings saved successfully!' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Settings</h2>
        <Button onClick={saveAllSettings} disabled={loading}>
          {loading ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile"><User className="w-4 h-4 mr-2" />Profile</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="w-4 h-4 mr-2" />Notifications</TabsTrigger>
          <TabsTrigger value="appearance"><Palette className="w-4 h-4 mr-2" />Appearance</TabsTrigger>
          <TabsTrigger value="security"><Shield className="w-4 h-4 mr-2" />Security</TabsTrigger>
          <TabsTrigger value="integrations"><Plug className="w-4 h-4 mr-2" />Integrations</TabsTrigger>
          <TabsTrigger value="database"><Database className="w-4 h-4 mr-2" />Database</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <SettingsProfile user={user} profile={profile} setProfile={setProfile} />
        </TabsContent>

        <TabsContent value="notifications">
          <SettingsNotifications notifications={notifications} setNotifications={setNotifications} />
        </TabsContent>

        <TabsContent value="appearance">
          <SettingsAppearance appearance={appearance} setAppearance={setAppearance} />
        </TabsContent>

        <TabsContent value="security">
          <SettingsSecurity security={security} setSecurity={setSecurity} />
        </TabsContent>

        <TabsContent value="integrations">
          <SettingsIntegrations integrations={integrations} setIntegrations={setIntegrations} />
        </TabsContent>

        <TabsContent value="database">
          <DatabaseSetup />
        </TabsContent>
      </Tabs>
    </div>
  );
};