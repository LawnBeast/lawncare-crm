import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Terminal, RefreshCw, Download, Zap } from 'lucide-react';

export const TroubleshootingHelper = () => {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const commonIssues = [
    {
      id: 'npm-not-found',
      title: '"npm not found"',
      severity: 'high',
      solution: 'Install Node.js from nodejs.org',
      steps: [
        'Go to https://nodejs.org',
        'Download LTS version (18.x or higher)',
        'Install and restart computer',
        'Verify: node --version'
      ]
    },
    {
      id: 'port-in-use',
      title: '"Port in use"',
      severity: 'medium',
      solution: 'Use different port',
      steps: [
        'Stop other development servers',
        'Run: npm run dev -- --port 3000',
        'Or try: npm run dev -- --port 8080'
      ]
    },
    {
      id: 'install-fails',
      title: 'Install fails',
      severity: 'high',
      solution: 'Clear cache and reinstall',
      steps: [
        'Run: npm cache clean --force',
        'Delete node_modules folder',
        'Delete package-lock.json',
        'Run: npm install'
      ]
    },
    {
      id: 'blank-page',
      title: 'Blank page',
      severity: 'medium',
      solution: 'Check terminal for errors',
      steps: [
        'Open browser console (F12)',
        'Check terminal output',
        'Ensure server is running',
        'Try: npm run dev'
      ]
    }
  ];

  const quickFixes = [
    {
      title: 'Use different port',
      command: 'npm run dev -- --port 3000',
      description: 'If port 5173 is busy'
    },
    {
      title: 'Clear npm cache',
      command: 'npm cache clean --force',
      description: 'Fix corrupted cache'
    },
    {
      title: 'Fresh installation',
      command: 'rm -rf node_modules package-lock.json && npm install',
      description: 'Nuclear option - complete reset'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Troubleshooting Helper</h1>
        <p className="text-muted-foreground">
          Having issues getting the CRM running? We've got you covered.
        </p>
      </div>

      <Tabs defaultValue="issues" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="issues">Common Issues</TabsTrigger>
          <TabsTrigger value="fixes">Quick Fixes</TabsTrigger>
          <TabsTrigger value="verify">Verify Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="mt-6">
          <div className="grid gap-4">
            {commonIssues.map((issue) => (
              <Card key={issue.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      {issue.title}
                    </CardTitle>
                    <Badge variant={issue.severity === 'high' ? 'destructive' : 'secondary'}>
                      {issue.severity}
                    </Badge>
                  </div>
                </CardHeader>
                {selectedIssue === issue.id && (
                  <CardContent>
                    <Alert className="mb-4">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Solution:</strong> {issue.solution}
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Steps to fix:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        {issue.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fixes" className="mt-6">
          <div className="grid gap-4">
            {quickFixes.map((fix, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Zap className="h-5 w-5 text-yellow-500 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{fix.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{fix.description}</p>
                      <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
                        {fix.command}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="verify" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Verify Your Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">1. Check Node.js Version</h3>
                  <div className="bg-gray-100 p-2 rounded font-mono text-sm mb-2">
                    node --version
                  </div>
                  <p className="text-sm text-muted-foreground">Should show v18.x.x or higher</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">2. Check npm Version</h3>
                  <div className="bg-gray-100 p-2 rounded font-mono text-sm mb-2">
                    npm --version
                  </div>
                  <p className="text-sm text-muted-foreground">Should show 8.x.x or higher</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">3. Navigate to Project</h3>
                  <div className="bg-gray-100 p-2 rounded font-mono text-sm mb-2">
                    cd path/to/project
                  </div>
                  <p className="text-sm text-muted-foreground">Replace with your actual path</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">4. Install Dependencies</h3>
                  <div className="bg-gray-100 p-2 rounded font-mono text-sm mb-2">
                    npm install
                  </div>
                  <p className="text-sm text-muted-foreground">Takes 2-5 minutes</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">5. Start Server</h3>
                  <div className="bg-gray-100 p-2 rounded font-mono text-sm mb-2">
                    npm run dev
                  </div>
                  <p className="text-sm text-muted-foreground">Opens at http://localhost:5173</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8 bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Still Having Issues?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If these solutions don't work, try a complete fresh start:
            </p>
            <div className="bg-white p-4 rounded-lg border">
              <div className="font-mono text-sm space-y-1">
                <div>rm -rf node_modules package-lock.json</div>
                <div>npm cache clean --force</div>
                <div>npm install</div>
                <div>npm run dev</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};