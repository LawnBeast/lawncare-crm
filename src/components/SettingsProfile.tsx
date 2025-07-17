import React from 'react';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProfileData {
  full_name: string;
  phone: string;
  company: string;
  job_title: string;
  bio: string;
  timezone: string;
  language: string;
}

interface SettingsProfileProps {
  user: any;
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
}

export const SettingsProfile: React.FC<SettingsProfileProps> = ({ user, profile, setProfile }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user?.email || ''} disabled />
          </div>
          <div>
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              value={profile.full_name}
              onChange={(e) => setProfile({...profile, full_name: e.target.value})}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => setProfile({...profile, phone: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="job_title">Job Title</Label>
            <Input
              id="job_title"
              value={profile.job_title}
              onChange={(e) => setProfile({...profile, job_title: e.target.value})}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={profile.company}
            onChange={(e) => setProfile({...profile, company: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
            placeholder="Tell us about yourself..."
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={profile.timezone} onValueChange={(value) => setProfile({...profile, timezone: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="EST">Eastern Time</SelectItem>
                <SelectItem value="CST">Central Time</SelectItem>
                <SelectItem value="MST">Mountain Time</SelectItem>
                <SelectItem value="PST">Pacific Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="language">Language</Label>
            <Select value={profile.language} onValueChange={(value) => setProfile({...profile, language: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};