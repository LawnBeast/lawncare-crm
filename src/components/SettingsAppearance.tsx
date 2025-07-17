import React from 'react';
import { Palette, Monitor, Sun, Moon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface AppearanceSettings {
  theme: string;
  colorScheme: string;
  fontSize: number;
  compactMode: boolean;
  animations: boolean;
  highContrast: boolean;
  sidebarCollapsed: boolean;
  showAvatars: boolean;
}

interface SettingsAppearanceProps {
  appearance: AppearanceSettings;
  setAppearance: (appearance: AppearanceSettings) => void;
}

export const SettingsAppearance: React.FC<SettingsAppearanceProps> = ({ appearance, setAppearance }) => {
  const updateAppearance = (key: keyof AppearanceSettings, value: string | number | boolean) => {
    setAppearance({ ...appearance, [key]: value });
  };

  const resetToDefaults = () => {
    setAppearance({
      theme: 'system',
      colorScheme: 'blue',
      fontSize: 14,
      compactMode: false,
      animations: true,
      highContrast: false,
      sidebarCollapsed: false,
      showAvatars: true
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Appearance Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Theme
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant={appearance.theme === 'light' ? 'default' : 'outline'}
              className="flex items-center gap-2"
              onClick={() => updateAppearance('theme', 'light')}
            >
              <Sun className="w-4 h-4" />
              Light
            </Button>
            <Button
              variant={appearance.theme === 'dark' ? 'default' : 'outline'}
              className="flex items-center gap-2"
              onClick={() => updateAppearance('theme', 'dark')}
            >
              <Moon className="w-4 h-4" />
              Dark
            </Button>
            <Button
              variant={appearance.theme === 'system' ? 'default' : 'outline'}
              className="flex items-center gap-2"
              onClick={() => updateAppearance('theme', 'system')}
            >
              <Monitor className="w-4 h-4" />
              System
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Color Scheme</h3>
          <Select value={appearance.colorScheme} onValueChange={(value) => updateAppearance('colorScheme', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="gray">Gray</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Typography</h3>
          <div>
            <Label htmlFor="font-size">Font Size: {appearance.fontSize}px</Label>
            <Slider
              id="font-size"
              min={12}
              max={18}
              step={1}
              value={[appearance.fontSize]}
              onValueChange={(value) => updateAppearance('fontSize', value[0])}
              className="mt-2"
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Layout & Behavior</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="compact-mode">Compact Mode</Label>
              <Switch
                id="compact-mode"
                checked={appearance.compactMode}
                onCheckedChange={(checked) => updateAppearance('compactMode', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="animations">Enable Animations</Label>
              <Switch
                id="animations"
                checked={appearance.animations}
                onCheckedChange={(checked) => updateAppearance('animations', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast">High Contrast</Label>
              <Switch
                id="high-contrast"
                checked={appearance.highContrast}
                onCheckedChange={(checked) => updateAppearance('highContrast', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sidebar-collapsed">Collapse Sidebar by Default</Label>
              <Switch
                id="sidebar-collapsed"
                checked={appearance.sidebarCollapsed}
                onCheckedChange={(checked) => updateAppearance('sidebarCollapsed', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-avatars">Show User Avatars</Label>
              <Switch
                id="show-avatars"
                checked={appearance.showAvatars}
                onCheckedChange={(checked) => updateAppearance('showAvatars', checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex justify-end">
          <Button variant="outline" onClick={resetToDefaults}>
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};