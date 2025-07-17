import React from 'react';
import { Bell, Mail, MessageSquare, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  desktop: boolean;
  frequency: string;
  quietHours: boolean;
  quietStart: string;
  quietEnd: string;
  jobReminders: boolean;
  clientUpdates: boolean;
  systemAlerts: boolean;
  marketingEmails: boolean;
}

interface SettingsNotificationsProps {
  notifications: NotificationSettings;
  setNotifications: (notifications: NotificationSettings) => void;
}

export const SettingsNotifications: React.FC<SettingsNotificationsProps> = ({ notifications, setNotifications }) => {
  const updateNotification = (key: keyof NotificationSettings, value: boolean | string) => {
    setNotifications({ ...notifications, [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Delivery Methods
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={notifications.email}
                onCheckedChange={(checked) => updateNotification('email', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <Switch
                id="push-notifications"
                checked={notifications.push}
                onCheckedChange={(checked) => updateNotification('push', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <Switch
                id="sms-notifications"
                checked={notifications.sms}
                onCheckedChange={(checked) => updateNotification('sms', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="desktop-notifications">Desktop Notifications</Label>
              <Switch
                id="desktop-notifications"
                checked={notifications.desktop}
                onCheckedChange={(checked) => updateNotification('desktop', checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Content Types
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="job-reminders">Job Reminders</Label>
              <Switch
                id="job-reminders"
                checked={notifications.jobReminders}
                onCheckedChange={(checked) => updateNotification('jobReminders', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="client-updates">Client Updates</Label>
              <Switch
                id="client-updates"
                checked={notifications.clientUpdates}
                onCheckedChange={(checked) => updateNotification('clientUpdates', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="system-alerts">System Alerts</Label>
              <Switch
                id="system-alerts"
                checked={notifications.systemAlerts}
                onCheckedChange={(checked) => updateNotification('systemAlerts', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="marketing-emails">Marketing Emails</Label>
              <Switch
                id="marketing-emails"
                checked={notifications.marketingEmails}
                onCheckedChange={(checked) => updateNotification('marketingEmails', checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Frequency & Timing</h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="frequency">Notification Frequency</Label>
              <Select value={notifications.frequency} onValueChange={(value) => updateNotification('frequency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant</SelectItem>
                  <SelectItem value="hourly">Hourly Digest</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Digest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="quiet-hours">Enable Quiet Hours</Label>
              <Switch
                id="quiet-hours"
                checked={notifications.quietHours}
                onCheckedChange={(checked) => updateNotification('quietHours', checked)}
              />
            </div>
            {notifications.quietHours && (
              <div className="grid grid-cols-2 gap-4 ml-6">
                <div>
                  <Label htmlFor="quiet-start">Start Time</Label>
                  <Select value={notifications.quietStart} onValueChange={(value) => updateNotification('quietStart', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="22:00">10:00 PM</SelectItem>
                      <SelectItem value="23:00">11:00 PM</SelectItem>
                      <SelectItem value="00:00">12:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quiet-end">End Time</Label>
                  <Select value={notifications.quietEnd} onValueChange={(value) => updateNotification('quietEnd', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="06:00">6:00 AM</SelectItem>
                      <SelectItem value="07:00">7:00 AM</SelectItem>
                      <SelectItem value="08:00">8:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};