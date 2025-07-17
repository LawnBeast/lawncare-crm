import React, { useState } from 'react';
import { Plug, Check, X, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
  apiKey?: string;
  webhookUrl?: string;
  settings?: Record<string, any>;
}

interface SettingsIntegrationsProps {
  integrations: Integration[];
  setIntegrations: (integrations: Integration[]) => void;
}

export const SettingsIntegrations: React.FC<SettingsIntegrationsProps> = ({ integrations, setIntegrations }) => {
  const [editingIntegration, setEditingIntegration] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const { toast } = useToast();

  const toggleIntegration = (id: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, connected: !integration.connected }
        : integration
    ));
    toast({ 
      title: 'Success', 
      description: `Integration ${integrations.find(i => i.id === id)?.connected ? 'disconnected' : 'connected'}` 
    });
  };

  const saveIntegrationSettings = (id: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, apiKey, webhookUrl }
        : integration
    ));
    setEditingIntegration(null);
    setApiKey('');
    setWebhookUrl('');
    toast({ title: 'Success', description: 'Integration settings saved' });
  };

  const startEditing = (integration: Integration) => {
    setEditingIntegration(integration.id);
    setApiKey(integration.apiKey || '');
    setWebhookUrl(integration.webhookUrl || '');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plug className="w-5 h-5" />
          Integrations & API
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Available Integrations</h3>
          <div className="space-y-4">
            {integrations.map((integration) => (
              <div key={integration.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">{integration.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{integration.name}</h4>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={integration.connected ? 'default' : 'secondary'}>
                      {integration.connected ? (
                        <><Check className="w-3 h-3 mr-1" />Connected</>
                      ) : (
                        <><X className="w-3 h-3 mr-1" />Disconnected</>
                      )}
                    </Badge>
                    <Switch
                      checked={integration.connected}
                      onCheckedChange={() => toggleIntegration(integration.id)}
                    />
                  </div>
                </div>
                
                {integration.connected && (
                  <div className="space-y-3">
                    <Separator />
                    {editingIntegration === integration.id ? (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor={`api-key-${integration.id}`}>API Key</Label>
                          <Input
                            id={`api-key-${integration.id}`}
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter API key"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`webhook-${integration.id}`}>Webhook URL</Label>
                          <Input
                            id={`webhook-${integration.id}`}
                            value={webhookUrl}
                            onChange={(e) => setWebhookUrl(e.target.value)}
                            placeholder="https://your-webhook-url.com"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => saveIntegrationSettings(integration.id)}>
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingIntegration(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          {integration.apiKey ? 'API key configured' : 'No API key set'}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => startEditing(integration)}>
                            Configure
                          </Button>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Docs
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">API Access</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>API Key</Label>
                <p className="text-sm text-gray-600">Use this key to access the CRM API</p>
              </div>
              <Button variant="outline" size="sm">
                Generate New Key
              </Button>
            </div>
            <div className="p-3 bg-gray-50 rounded border font-mono text-sm">
              crm_api_key_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Webhook Settings</h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="global-webhook">Global Webhook URL</Label>
              <Input
                id="global-webhook"
                placeholder="https://your-app.com/webhook"
              />
            </div>
            <div className="text-sm text-gray-600">
              This webhook will receive notifications for all CRM events.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};