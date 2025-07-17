import React, { useState } from 'react';
import { Shield, Key, Smartphone, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  loginNotifications: boolean;
  passwordExpiry: boolean;
}

interface SettingsSecurityProps {
  security: SecuritySettings;
  setSecurity: (security: SecuritySettings) => void;
}

export const SettingsSecurity: React.FC<SettingsSecurityProps> = ({ security, setSecurity }) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const updateSecurity = (key: keyof SecuritySettings, value: boolean | number) => {
    setSecurity({ ...security, [key]: value });
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: 'Error', description: 'Password must be at least 6 characters', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast({ title: 'Success', description: 'Password updated successfully!' });
      setShowPasswordForm(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
    setLoading(false);
  };

  const signOutAllDevices = async () => {
    try {
      await supabase.auth.signOut({ scope: 'global' });
      toast({ title: 'Success', description: 'Signed out from all devices' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Security Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <Key className="w-4 h-4" />
            Password & Authentication
          </h3>
          
          {!showPasswordForm ? (
            <Button variant="outline" onClick={() => setShowPasswordForm(true)}>
              Change Password
            </Button>
          ) : (
            <div className="space-y-4 p-4 border rounded-lg">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPasswords ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPasswords(!showPasswords)}
                  >
                    {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type={showPasswords ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type={showPasswords ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={changePassword} disabled={loading}>
                  {loading ? 'Updating...' : 'Update Password'}
                </Button>
                <Button variant="outline" onClick={() => setShowPasswordForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            Two-Factor Authentication
            <Badge variant={security.twoFactorEnabled ? 'default' : 'secondary'}>
              {security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <Switch
              id="two-factor"
              checked={security.twoFactorEnabled}
              onCheckedChange={(checked) => updateSecurity('twoFactorEnabled', checked)}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Session Management</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="login-notifications">Login Notifications</Label>
                <p className="text-sm text-gray-600">Get notified when someone logs into your account</p>
              </div>
              <Switch
                id="login-notifications"
                checked={security.loginNotifications}
                onCheckedChange={(checked) => updateSecurity('loginNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="password-expiry">Password Expiry Reminders</Label>
                <p className="text-sm text-gray-600">Remind me to change my password regularly</p>
              </div>
              <Switch
                id="password-expiry"
                checked={security.passwordExpiry}
                onCheckedChange={(checked) => updateSecurity('passwordExpiry', checked)}
              />
            </div>
          </div>
          <Button variant="outline" onClick={signOutAllDevices}>
            Sign Out All Devices
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium text-red-600 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Danger Zone
          </h3>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              These actions are irreversible. Please proceed with caution.
            </AlertDescription>
          </Alert>
          <div className="space-y-2">
            <Button variant="destructive" className="w-full" disabled>
              Delete Account (Coming Soon)
            </Button>
            <p className="text-sm text-gray-600">
              This will permanently delete your account and all associated data.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};